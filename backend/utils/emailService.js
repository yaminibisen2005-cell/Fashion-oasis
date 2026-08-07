import AppError from './AppError.js';

export const sendEmail = async ({ to, subject, htmlContent }) => {
  if (!process.env.BREVO_API_KEY) {
    console.warn('BREVO_API_KEY not found. Email not sent.');
    return;
  }

  const payload = {
    sender: { name: 'Fashion Oasis', email: 'fashionoasis082@gmail.com' },
    to: Array.isArray(to) ? to : [{ email: to }],
    subject,
    htmlContent,
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      throw new AppError('Failed to send email', 500);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw to prevent crashing main flow, just log
  }
};
