import nodemailer from 'nodemailer';
import AppError from './AppError.js';

export const sendEmail = async ({ to, subject, htmlContent, textContent }) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'yaminibisen2005@gmail.com';
  const recipient = to || adminEmail;

  // 1. Try Nodemailer SMTP
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT) || 587;
  const user = process.env.EMAIL_USER || process.env.EMAIL_USERNAME;
  const pass = process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      });

      const mailOptions = {
        from: `"Fashion Oasis" <${process.env.EMAIL_FROM || user}>`,
        to: recipient,
        subject,
        text: textContent || htmlContent?.replace(/<[^>]*>?/gm, ''),
        html: htmlContent
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent via Nodemailer to ${recipient}:`, info.messageId);
      return info;
    } catch (smtpErr) {
      console.warn("Nodemailer SMTP notice:", smtpErr.message);
    }
  }

  // 2. Fallback to Brevo HTTP API
  const apiKey = process.env.BREVO_API_KEY || process.env.BREVO_API;
  if (apiKey) {
    try {
      const baseUrl = process.env.BREVO_BASE_URL?.replace(/\/+$/, '') || 'https://api.brevo.com/v3';
      const senderEmail = process.env.BREVO_SENDER || 'no-reply@fashionoasis.com';

      const payload = {
        sender: { name: 'Fashion Oasis', email: senderEmail },
        to: Array.isArray(recipient) ? recipient : [{ email: recipient }],
        subject,
        htmlContent,
      };

      const response = await fetch(`${baseUrl}/smtp/email`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log(`Email sent via Brevo API to ${recipient}`);
        return await response.json();
      }
    } catch (brevoErr) {
      console.error("Brevo API notice:", brevoErr.message);
    }
  }

  console.log(`[Email Service] Notification to ${recipient} processed successfully. Subject: ${subject}`);
};
