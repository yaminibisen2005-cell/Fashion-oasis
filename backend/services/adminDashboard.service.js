import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

export const getStats = async () => {
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
    currentMonthCustomers,
    prevMonthCustomers,
    currentMonthRev,
    prevMonthRev,
  ] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    User.countDocuments({ role: 'customer' }),
    Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
    Order.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    Order.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),
    Product.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    Product.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),
    User.countDocuments({ role: 'customer', createdAt: { $gte: thirtyDaysAgo } }),
    User.countDocuments({ role: 'customer', createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),
    Order.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo }, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
    Order.aggregate([
      { $match: { createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }, status: { $ne: 'Cancelled' } } },
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
    customersTrend: calcTrend(currentMonthCustomers, prevMonthCustomers),
  };
};

const fillMissingDays = (seriesAgg, days) => {
  const salesMap = {};
  seriesAgg.forEach((item) => {
    salesMap[item._id] = item.sales;
  });

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedSeries = [];

  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);

    const year = d.getFullYear();
    const monthStr = String(d.getMonth() + 1).padStart(2, '0');
    const dayStr = String(d.getDate()).padStart(2, '0');
    const key = `${year}-${monthStr}-${dayStr}`;

    const dateLabel = `${monthNames[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}`;
    formattedSeries.push({
      date: dateLabel,
      sales: salesMap[key] || 0,
    });
  }

  return formattedSeries;
};

export const getSalesAnalytics = async (range = '7days') => {
  const days = range === '30days' ? 30 : 7;
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - (days - 1));
  startDate.setHours(0, 0, 0, 0);

  const seriesAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: startDate }, status: { $ne: 'Cancelled' } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        sales: { $sum: '$totalAmount' },
      },
    },
  ]);

  const series = fillMissingDays(seriesAgg, days);
  const totalRevenue = series.reduce((acc, curr) => acc + curr.sales, 0);

  return {
    range,
    totalRevenue,
    revenueTrend: 0,
    series,
  };
};

export const getRecentOrders = async (limit = 4) => {
  return await Order.find()
    .populate('customer', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};

export const getTopProducts = async (limit = 4) => {
  return await Product.find()
    .sort({ totalSold: -1 })
    .limit(limit)
    .lean();
};

export const getTopCustomers = async (limit = 4) => {
  return await Order.aggregate([
    { $match: { status: { $ne: 'Cancelled' } } },
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
