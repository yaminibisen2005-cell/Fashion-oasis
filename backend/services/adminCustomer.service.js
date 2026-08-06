import Customer from '../models/customer.js';
import Order from '../models/Order.js';
import AppError from '../utils/AppError.js';

export const getAllCustomers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  // Use aggregation to join orders and calculate total spent and order count
  const pipeline = [
    {
      $lookup: {
        from: 'orders',
        localField: '_id',
        foreignField: 'customer',
        as: 'userOrders'
      }
    },
    {
      $addFields: {
        ordersCount: { $size: '$userOrders' },
        spent: { $sum: '$userOrders.totalAmount' }
      }
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        status: 1,
        avatar: 1,
        ordersCount: 1,
        spent: 1,
        createdAt: 1
      }
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit }
  ];

  const customers = await Customer.aggregate(pipeline);
  const total = await Customer.countDocuments();

  return {
    customers,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    }
  };
};

export const toggleCustomerStatus = async (customerId) => {
  const customer = await Customer.findById(customerId);
  
  if (!customer) {
    throw new AppError('Customer not found', 404);
  }

  customer.status = customer.status === 'Active' ? 'Inactive' : 'Active';
  await customer.save({ validateBeforeSave: false });

  return customer;
};
