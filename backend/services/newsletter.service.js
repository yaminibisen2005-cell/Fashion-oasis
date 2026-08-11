import Newsletter from '../models/Newsletter.js';
import { sendEmail } from '../utils/emailService.js';

export const subscribeNewsletter = async (subscriberEmail) => {
  const cleanEmail = subscriberEmail.trim().toLowerCase();

  // 1. Save or update subscriber in MongoDB
  let subscriber = await Newsletter.findOne({ email: cleanEmail });
  if (!subscriber) {
    subscriber = await Newsletter.create({ email: cleanEmail });
  } else if (subscriber.status !== 'Subscribed') {
    subscriber.status = 'Subscribed';
    await subscriber.save();
  }

  // 2. Format email notifications
  const adminEmail = process.env.ADMIN_EMAIL || 'yaminibisen2005@gmail.com';
  const currentDateTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium"
  });

  const emailText = `----------------------------------------\nNew Newsletter Subscriber\n\nEmail:\n${cleanEmail}\n\nSubscribed At:\n${currentDateTime}\n\nFashion Oasis\n----------------------------------------`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #D4A04B; border-bottom: 2px solid #D4A04B; padding-bottom: 10px;">New Newsletter Subscriber</h2>
      <p style="margin-top: 15px;"><strong>Email:</strong> ${cleanEmail}</p>
      <p><strong>Subscribed At:</strong> ${currentDateTime}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888;">Fashion Oasis Automated Notification</p>
    </div>
  `;

  // 3. Send notification to yaminibisen2005@gmail.com
  try {
    await sendEmail({
      to: adminEmail,
      subject: 'New Newsletter Subscription',
      textContent: emailText,
      htmlContent: emailHtml
    });
  } catch (emailErr) {
    console.warn("Newsletter notification email warning:", emailErr?.message || emailErr);
  }

  return subscriber;
};
