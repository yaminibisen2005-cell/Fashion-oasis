// Controller for admin seller management
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

// Get all approved sellers (role seller, status Active or Suspended)
export const getAllSellers = asyncHandler(async (req, res) => {
  const sellers = await User.find({ role: 'seller' }).select('-password').lean();
  res.status(200).json({ success: true, data: sellers });
});

// Get pending seller verification requests (status Inactive and maybe a flag pendingVerification?)
// Assuming pending sellers are those with status 'Inactive' and a field pendingVerification true
export const getPendingSellers = asyncHandler(async (req, res) => {
  const pending = await User.find({ role: 'seller', pendingVerification: true }).lean();
  res.status(200).json({ success: true, data: pending });
});

// Approve pending seller
export const approveSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const seller = await User.findById(id);
  if (!seller) throw new AppError('Seller not found', 404);
  seller.status = 'Active';
  seller.pendingVerification = false;
  await seller.save();
  res.status(200).json({ success: true, data: seller });
});

// Reject pending seller
export const rejectSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const seller = await User.findById(id);
  if (!seller) throw new AppError('Seller not found', 404);
  // Optionally store rejection reason somewhere; for now just delete
  await User.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: 'Seller rejected', reason });
});

// Toggle seller status (Active <-> Suspended)
export const toggleSellerStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const seller = await User.findById(id);
  if (!seller) throw new AppError('Seller not found', 404);
  seller.status = seller.status === 'Active' ? 'Suspended' : 'Active';
  await seller.save();
  res.status(200).json({ success: true, data: seller });
});
