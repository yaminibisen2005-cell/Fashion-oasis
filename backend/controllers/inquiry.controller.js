import Inquiry from '../models/Inquiry.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { sendEmail } from '../utils/emailService.js';

// Helper for basic string sanitization to prevent XSS
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

// @desc    Submit new contact inquiry
// @route   POST /api/v1/inquiry
export const submitInquiry = catchAsync(async (req, res, next) => {
  const { name, fullName, email, phone, phoneNumber, subject, message, botField } = req.body;

  // Anti-spam honeypot check: if botField is filled, reject quietly
  if (botField) {
    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
    });
  }

  const rawName = (fullName || name || '').trim();
  const rawEmail = (email || '').trim().toLowerCase();
  const rawPhone = (phone || phoneNumber || '').trim();
  const rawSubject = (subject || '').trim();
  const rawMessage = (message || '').trim();

  // Validations
  if (!rawName) return next(new AppError('Full name is required', 400));
  if (!rawEmail) return next(new AppError('Email address is required', 400));
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(rawEmail)) return next(new AppError('Invalid email address format', 400));

  if (!rawPhone) return next(new AppError('Phone number is required', 400));
  const phoneRegex = /^[0-9+\s()-]{7,15}$/;
  if (!phoneRegex.test(rawPhone)) return next(new AppError('Invalid phone number format', 400));

  if (!rawSubject) return next(new AppError('Subject is required', 400));
  if (!rawMessage) return next(new AppError('Message is required', 400));

  // Sanitize
  const cleanName = sanitizeInput(rawName);
  const cleanEmail = rawEmail;
  const cleanPhone = sanitizeInput(rawPhone);
  const cleanSubject = sanitizeInput(rawSubject);
  const cleanMessage = sanitizeInput(rawMessage);

  // Save to DB
  const inquiry = await Inquiry.create({
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    subject: cleanSubject,
    message: cleanMessage,
    status: 'Unread',
  });

  const adminEmail = process.env.ADMIN_EMAIL || 'yaminibisen2005@gmail.com';
  const formattedDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // 1. Admin Email Notification
  try {
    await sendEmail({
      to: adminEmail,
      subject: `New Contact Inquiry: ${cleanSubject}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #EF6F8F;">New Contact Inquiry Received</h2>
          <p><strong>Name:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
          <p><strong>Phone:</strong> ${cleanPhone}</p>
          <p><strong>Subject:</strong> ${cleanSubject}</p>
          <p><strong>Submitted At:</strong> ${formattedDate}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;" />
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 8px;">${cleanMessage}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send admin inquiry notification email:', err);
  }

  // 2. Customer Confirmation Email
  try {
    await sendEmail({
      to: cleanEmail,
      subject: 'Inquiry Received - Fashion Oasis',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #EF6F8F;">Thank You for Contacting Fashion Oasis!</h2>
          <p>Dear ${cleanName},</p>
          <p>We have received your message regarding "<strong>${cleanSubject}</strong>". Our customer support team will review your request and get back to you within 24 hours.</p>
          <br/>
          <p>Warm Regards,</p>
          <p><strong>Fashion Oasis Team</strong></p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send customer confirmation email:', err);
  }

  res.status(201).json({
    success: true,
    message: 'Thank you! Your inquiry has been sent successfully.',
    data: inquiry,
  });
});

// @desc    Get all inquiries for Admin
// @route   GET /api/v1/inquiry/admin
export const getInquiriesAdmin = catchAsync(async (req, res, next) => {
  const { search, status } = req.query;

  const query = {};

  if (status && status !== 'All') {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }

  const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
  const unreadCount = await Inquiry.countDocuments({ status: 'Unread' });

  res.status(200).json({
    success: true,
    count: inquiries.length,
    unreadCount,
    data: inquiries,
  });
});

// @desc    Toggle or update inquiry status (Admin)
// @route   PATCH /api/v1/inquiry/:id/status
export const toggleInquiryStatus = catchAsync(async (req, res, next) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return next(new AppError('Inquiry not found', 404));
  }

  let nextStatus = 'Read';
  if (req.body.status) {
    nextStatus = req.body.status;
  } else {
    nextStatus = inquiry.status === 'Unread' ? 'Read' : 'Unread';
  }

  inquiry.status = nextStatus;
  await inquiry.save();

  res.status(200).json({
    success: true,
    message: `Inquiry status updated to ${inquiry.status}`,
    data: inquiry,
  });
});

// @desc    Delete inquiry (Admin)
// @route   DELETE /api/v1/inquiry/:id
export const deleteInquiry = catchAsync(async (req, res, next) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

  if (!inquiry) {
    return next(new AppError('Inquiry not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Inquiry deleted successfully',
  });
});
