import catchAsync from '../utils/catchAsync.js';
import * as analyticsService from '../services/adminAnalytics.service.js';

export const getAnalytics = catchAsync(async (req, res) => {
  const days = Number(req.query.days) || 30;
  const data = await analyticsService.getAnalyticsSummary(days);
  res.status(200).json({ success: true, data });
});
