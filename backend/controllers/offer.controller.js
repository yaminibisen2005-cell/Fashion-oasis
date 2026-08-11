import Offer from '../models/Offer.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

// @desc    Get public active non-expired special offers
// @route   GET /api/v1/offers
export const getActiveOffers = catchAsync(async (req, res, next) => {
  const now = new Date();

  // Find offers with status 'Active' and endDate either null or >= now
  const offers = await Offer.find({
    status: 'Active',
    $or: [{ endDate: { $gte: now } }, { endDate: null }, { endDate: { $exists: false } }],
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: offers.length,
    data: offers,
  });
});

// @desc    Get all offers (Admin view)
// @route   GET /api/v1/offers/admin
export const getAllOffersAdmin = catchAsync(async (req, res, next) => {
  const offers = await Offer.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: offers.length,
    data: offers,
  });
});

// @desc    Get single offer by ID
// @route   GET /api/v1/offers/:id
export const getOfferById = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError('Special offer not found', 404));
  }

  res.status(200).json({
    success: true,
    data: offer,
  });
});

// @desc    Create new special offer (Admin only)
// @route   POST /api/v1/offers
export const createOffer = catchAsync(async (req, res, next) => {
  const { title, description, discount, image, startDate, endDate, status } = req.body;

  if (!title || !title.trim()) {
    return next(new AppError('Offer title is required', 400));
  }

  if (!discount || !discount.trim()) {
    return next(new AppError('Discount value/percentage is required', 400));
  }

  const newOffer = await Offer.create({
    title: title.trim(),
    description: description ? description.trim() : '',
    discount: discount.trim(),
    image: image || '',
    startDate: startDate || new Date(),
    endDate: endDate || null,
    status: status || 'Active',
  });

  res.status(201).json({
    success: true,
    message: 'Special offer created successfully',
    data: newOffer,
  });
});

// @desc    Update special offer (Admin only)
// @route   PUT /api/v1/offers/:id
export const updateOffer = catchAsync(async (req, res, next) => {
  const { title, description, discount, image, startDate, endDate, status } = req.body;

  if (title !== undefined && !title.trim()) {
    return next(new AppError('Offer title cannot be empty', 400));
  }

  if (discount !== undefined && !discount.trim()) {
    return next(new AppError('Discount value cannot be empty', 400));
  }

  const updatedOffer = await Offer.findByIdAndUpdate(
    req.params.id,
    {
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(discount !== undefined && { discount: discount.trim() }),
      ...(image !== undefined && { image }),
      ...(startDate !== undefined && { startDate }),
      ...(endDate !== undefined && { endDate }),
      ...(status !== undefined && { status }),
    },
    { new: true, runValidators: true }
  );

  if (!updatedOffer) {
    return next(new AppError('Special offer not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Special offer updated successfully',
    data: updatedOffer,
  });
});

// @desc    Delete special offer (Admin only)
// @route   DELETE /api/v1/offers/:id
export const deleteOffer = catchAsync(async (req, res, next) => {
  const offer = await Offer.findByIdAndDelete(req.params.id);
  if (!offer) {
    return next(new AppError('Special offer not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Special offer deleted successfully',
  });
});

// @desc    Toggle offer status between Active/Inactive (Admin only)
// @route   PATCH /api/v1/offers/:id/toggle
export const toggleOfferStatus = catchAsync(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) {
    return next(new AppError('Special offer not found', 404));
  }

  offer.status = offer.status === 'Active' ? 'Inactive' : 'Active';
  await offer.save();

  res.status(200).json({
    success: true,
    message: `Offer status changed to ${offer.status}`,
    data: offer,
  });
});
