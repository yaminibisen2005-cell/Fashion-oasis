import Coupon from '../models/Coupon.js';

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const getCoupons = catchAsync(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();
  res.status(200).json({ success: true, data: coupons });
});

export const createCoupon = catchAsync(async (req, res) => {
  const { code, discount, minOrder, expiryDate, status } = req.body;
  if (!code || !discount) {
    return res.status(400).json({ success: false, message: 'Code and discount are required' });
  }

  // Check if coupon code already exists
  const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (existingCoupon) {
    return res.status(400).json({ success: false, message: 'Coupon code already exists' });
  }

  const coupon = await Coupon.create({
    code,
    discount,
    minOrder,
    expiryDate,
    status
  });

  res.status(201).json({ success: true, data: coupon });
});

export const deleteCoupon = catchAsync(async (req, res) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndDelete(id);
  
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Coupon not found' });
  }

  res.status(200).json({ success: true, message: 'Coupon deleted successfully' });
});

export const toggleCouponStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const coupon = await Coupon.findById(id);

  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Coupon not found' });
  }

  coupon.status = coupon.status === 'Active' ? 'Inactive' : 'Active';
  await coupon.save();

  res.status(200).json({ success: true, data: coupon });
});
