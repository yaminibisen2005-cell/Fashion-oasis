import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

export const getAnalyticsSummary = async (days = 30) => {
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const prevStartDate = new Date(startDate.getTime() - days * 24 * 60 * 60 * 1000);

  const [
    currOrdersAgg,
    prevOrdersAgg,
    currCustomersAgg,
    prevCustomersAgg,
    salesSeriesAgg,
    topCategoriesAgg
  ] = await Promise.all([
    Order.aggregate([
      { $match: { createdAt: { $gte: startDate }, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' }, totalOrders: { $sum: 1 } } }
    ]),
    Order.aggregate([
      { $match: { createdAt: { $gte: prevStartDate, $lt: startDate }, status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' }, totalOrders: { $sum: 1 } } }
    ]),
    User.countDocuments({ role: 'customer' }),
    User.countDocuments({ role: 'customer', createdAt: { $lt: startDate } }),
    Order.aggregate([
      { $match: { createdAt: { $gte: startDate }, status: { $ne: 'Cancelled' } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          sales: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    Product.aggregate([
      { $group: { _id: '$category', totalRevenue: { $sum: '$totalRevenue' }, totalSold: { $sum: '$totalSold' } } },
      { $sort: { totalRevenue: -1 } },
      { $limit: 4 }
    ])
  ]);

  const currRevenue = currOrdersAgg[0]?.totalRevenue || 0;
  const currOrderCount = currOrdersAgg[0]?.totalOrders || 0;
  
  const prevRevenue = prevOrdersAgg[0]?.totalRevenue || 0;
  const prevOrderCount = prevOrdersAgg[0]?.totalOrders || 0;

  const totalCustomers = currCustomersAgg;
  const prevTotalCustomers = prevCustomersAgg;

  const calcTrend = (curr, prev) => {
    if (!prev) return curr > 0 ? 100 : 0;
    return Number((((curr - prev) / prev) * 100).toFixed(2));
  };

  const currConvRate = totalCustomers ? (currOrderCount / totalCustomers) * 100 : 0;
  const prevConvRate = prevTotalCustomers ? (prevOrderCount / prevTotalCustomers) * 100 : 0;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const salesSeries = salesSeriesAgg.map(item => {
    const d = new Date(item._id);
    return {
      date: `${monthNames[d.getMonth()]} ${d.getDate()}`,
      sales: item.sales
    };
  });

  const totalCategoryRev = topCategoriesAgg.reduce((acc, cat) => acc + cat.totalRevenue, 0) || 1; // avoid / 0
  const topCategories = topCategoriesAgg.map(cat => ({
    name: cat._id,
    revenue: cat.totalRevenue,
    percentage: Math.round((cat.totalRevenue / totalCategoryRev) * 100)
  }));

  return {
    metrics: {
      totalRevenue: currRevenue,
      revenueTrend: calcTrend(currRevenue, prevRevenue),
      totalOrders: currOrderCount,
      ordersTrend: calcTrend(currOrderCount, prevOrderCount),
      totalCustomers: totalCustomers,
      customersTrend: calcTrend(totalCustomers, prevTotalCustomers),
      conversionRate: Number(currConvRate.toFixed(2)),
      conversionTrend: calcTrend(currConvRate, prevConvRate)
    },
    salesSeries,
    topCategories
  };
};
