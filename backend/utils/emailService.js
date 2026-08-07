import AppError from './AppError.js';

// Email utility using Brevo (Sendinblue) API. Reads configuration from environment variables.
export const sendEmail = async ({ to, subject, htmlContent }) => {
  // Prefer the specific API key env var; fallback to generic BREVO_API if present.
  const apiKey = process.env.BREVO_API_KEY || process.env.BREVO_API;
  const baseUrl = process.env.BREVO_BASE_URL?.replace(/\/+$/, '') || 'https://api.brevo.com/v3';
  const senderEmail = process.env.BREVO_SENDER || 'no-reply@fashionoasis.com';
  const senderName = 'Fashion Oasis';

  if (!apiKey) {
    console.warn('Brevo API key not configured (BREVO_API_KEY or BREVO_API). Email not sent.');
    return;
  }

  const payload = {
    sender: { name: senderName, email: senderEmail },
    to: Array.isArray(to) ? to : [{ email: to }],
    subject,
    htmlContent,
  };

  try {
    const response = await fetch(`${baseUrl}/smtp/email`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      throw new AppError('Failed to send email via Brevo', 500);
    }
    return await response.json();
  } catch (error) {
    console.error('Email sending failed:', error);
    // Swallow error to avoid uncaught exceptions in request flow.
  }
};
