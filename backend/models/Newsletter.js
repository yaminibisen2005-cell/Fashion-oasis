import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required for newsletter subscription'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Subscribed', 'Unsubscribed'],
      default: 'Subscribed',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Newsletter', newsletterSchema);
