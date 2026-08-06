import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

export const getStats = async (sellerId) => {
  const matchObj = { seller: sellerId };
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    revenueData,
    currentMonthOrders,
    prevMonthOrders,
    currentMonthProducts,
    prevMonthProducts,
    currentMonthRev,
    prevMonthRev,
  ] = await Promise.all([
    Product.countDocuments(matchObj),
    Order.countDocuments(matchObj),
    Order.distinct('customer', matchObj).then(res => res.length), // seller's unique customers
    Order.aggregate([
      { $match: { ...matchObj, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
    Order.countDocuments({ ...matchObj, createdAt: { $gte: thirtyDaysAgo } }),
    Order.countDocuments({ ...matchObj, createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),
    Product.countDocuments({ ...matchObj, createdAt: { $gte: thirtyDaysAgo } }),
    Product.countDocuments({ ...matchObj, createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),
    Order.aggregate([
      { $match: { ...matchObj, createdAt: { $gte: thirtyDaysAgo }, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
    Order.aggregate([
      { $match: { ...matchObj, createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
  ]);

  const calcTrend = (curr, prev) => {
    if (!prev) return curr > 0 ? 100 : 0;
    return Number((((curr - prev) / prev) * 100).toFixed(1));
  };

  const currRevVal = currentMonthRev[0]?.total || 0;
  const prevRevVal = prevMonthRev[0]?.total || 0;

  return {
    totalProducts,
    productsTrend: calcTrend(currentMonthProducts, prevMonthProducts),
    totalOrders,
    ordersTrend: calcTrend(currentMonthOrders, prevMonthOrders),
    totalRevenue: revenueData[0]?.total || 0,
    revenueTrend: calcTrend(currRevVal, prevRevVal),
    totalCustomers,
    customersTrend: 0, // Simplified for seller
  };
};

export const getSalesAnalytics = async (sellerId, range = '7days') => {
  const matchObj = { seller: sellerId };
  const days = range === '30days' ? 30 : 7;
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const series = await Order.aggregate([
    { $match: { ...matchObj, createdAt: { $gte: startDate }, status: { $ne: 'Cancelled' } } },
    {
      $group: {
        _id: { $dateToString: { format: '%b %d', date: '$createdAt' } },
        sales: { $sum: '$totalAmount' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const formattedSeries = series.map((item) => ({
    date: item._id,
    sales: item.sales,
  }));

  const totalRevenue = series.reduce((acc, curr) => acc + curr.sales, 0);

  return {
    range,
    totalRevenue,
    revenueTrend: 0,
    series: formattedSeries,
  };
};

export const getRecentOrders = async (sellerId, limit = 4) => {
  const matchObj = { seller: sellerId };
  return await Order.find(matchObj)
    .populate('customer', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

export const getTopProducts = async (sellerId, limit = 4) => {
  const matchObj = { seller: sellerId };
  return await Product.find(matchObj)
    .sort({ totalSold: -1 })
    .limit(limit)
    .lean();
};

export const getEarnings = async (sellerId) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  const matchSeller = { seller: sellerId, status: { $ne: 'Cancelled' } };

  const [todayRev, monthRev, prevMonthRev, lifetimeRev, totalOrders, monthlySeries, categoryBreakdown] = await Promise.all([
    Order.aggregate([
      { $match: { ...matchSeller, createdAt: { $gte: todayStart } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
    ]),
    Order.aggregate([
      { $match: { ...matchSeller, createdAt: { $gte: monthStart } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
    Order.aggregate([
      { $match: { ...matchSeller, createdAt: { $gte: prevMonthStart, $lt: monthStart } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
    Order.aggregate([
      { $match: matchSeller },
      { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 }, avgOrder: { $avg: '$totalAmount' } } }
    ]),
    Order.countDocuments({ seller: sellerId }),
    Order.aggregate([
      { $match: { ...matchSeller, createdAt: { $gte: yearStart } } },
      { $group: { _id: { $month: '$createdAt' }, revenue: { $sum: '$totalAmount' }, orders: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]),
    Order.aggregate([
      { $match: { seller: sellerId, status: 'Pending' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
  ]);

  const calcTrend = (curr, prev) => {
    if (!prev) return curr > 0 ? 100 : 0;
    return Number((((curr - prev) / prev) * 100).toFixed(1));
  };

  const monthRevVal = monthRev[0]?.total || 0;
  const prevMonthRevVal = prevMonthRev[0]?.total || 0;
  const lifetimeRevVal = lifetimeRev[0]?.total || 0;
  const avgOrderValue = lifetimeRev[0]?.avgOrder || 0;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = months.map((label, i) => {
    const found = monthlySeries.find(s => s._id === i + 1);
    return { month: label, revenue: found?.revenue || 0, orders: found?.orders || 0 };
  });

  const topProductsByRevenue = await Product.find({ seller: sellerId, status: 'Active' })
    .sort({ totalRevenue: -1 })
    .limit(5)
    .select('name category totalRevenue totalSold')
    .lean();

  const totalTopRevenue = topProductsByRevenue.reduce((s, p) => s + (p.totalRevenue || 0), 1);
  const categoryData = topProductsByRevenue.map(p => ({
    name: p.name,
    category: p.category,
    revenue: p.totalRevenue || 0,
    sold: p.totalSold || 0,
    percentage: Number(((p.totalRevenue || 0) / totalTopRevenue * 100).toFixed(1))
  }));

  return {
    todayEarnings: todayRev[0]?.total || 0,
    todayOrders: todayRev[0]?.count || 0,
    monthEarnings: monthRevVal,
    monthTrend: calcTrend(monthRevVal, prevMonthRevVal),
    lifetimeEarnings: lifetimeRevVal,
    pendingPayout: categoryBreakdown[0]?.total || 0,
    totalOrders,
    avgOrderValue: Number(avgOrderValue.toFixed(2)),
    monthlyData,
    topProducts: categoryData,
  };
};

export const getTopCustomers = async (sellerId, limit = 4) => {
  const matchObj = { seller: sellerId };
  return await Order.aggregate([
    { $match: { ...matchObj, status: { $ne: 'Cancelled' } } },
    {
      $group: {
        _id: '$customer',
        spent: { $sum: '$totalAmount' },
        orders: { $sum: 1 },
      },
    },
    { $sort: { spent: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'customerDetails',
      },
    },
    { $unwind: { path: '$customerDetails', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        name: { $ifNull: ['$customerDetails.name', 'Guest Customer'] },
        orders: 1,
        spent: 1,
        img: { $ifNull: ['$customerDetails.avatar', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80'] },
      },
    },
  ]);
};
