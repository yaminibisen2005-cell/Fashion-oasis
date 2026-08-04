import catchAsync from '../utils/catchAsync.js';
import * as authService from '../services/auth.service.js';

export const registerAdmin = catchAsync(async (req, res) => {
  const { name, email, password, adminKey } = req.body;
  const data = await authService.registerAdminService({ name, email, password, adminKey });
  res.status(201).json({ success: true, data });
});

export const loginAdmin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const data = await authService.loginAdminService({ email, password });
  res.status(200).json({ success: true, data });
});

export const getAdminProfile = catchAsync(async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});
