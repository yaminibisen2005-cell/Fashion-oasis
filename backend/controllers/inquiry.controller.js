import Inquiry from '../models/Inquiry.js';
import catchAsync from '../utils/catchAsync.js';
import { sendEmail } from '../utils/emailService.js';

export const submitInquiry = catchAsync(async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  const inquiry = await Inquiry.create({ name, email, subject, message });

  // Admin Email
  await sendEmail({
    to: 'fashionoasis082@gmail.com',
    subject: `New Inquiry: ${subject}`,
    htmlContent: `<p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong> ${message}</p>`,
  });

  // Customer Email
  await sendEmail({
    to: email,
    subject: 'Inquiry Received - Fashion Oasis',
    htmlContent: `<p>Thank you for contacting Fashion Oasis. We have received your inquiry and will get back to you soon.</p>`,
  });

  res.status(201).json({ success: true, data: inquiry });
});
