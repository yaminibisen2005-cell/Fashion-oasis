import catchAsync from '../utils/catchAsync.js';
import * as adminCustomerService from '../services/adminCustomer.service.js';

export const getCustomers = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  
  const data = await adminCustomerService.getAllCustomers(page, limit);
  
  res.status(200).json({
    success: true,
    data: data.customers,
    pagination: data.pagination
  });
});

export const toggleCustomerStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  const customer = await adminCustomerService.toggleCustomerStatus(id);
  
  res.status(200).json({
    success: true,
    message: 'Customer status updated successfully',
    data: customer
  });
});
