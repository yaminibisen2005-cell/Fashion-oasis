import { z } from 'zod';

export const adminRegisterSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').trim(),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    adminKey: z.string().min(1, 'Admin key is required')
  })
});

export const adminLoginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required')
  })
});

export const sellerProfileUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').trim().optional(),
    storeName: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    storeEmail: z.string().email('Invalid store email').optional(),
    storeLogo: z.string().trim().max(3, 'Logo initials max 3 characters').optional(),
    img: z.string().url('Invalid image URL').optional()
  })
});

export const sellerRegisterSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Full name is required').trim(),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number').trim(),
    storeName: z.string().min(1, 'Store name is required').trim(),
    businessAddress: z.string()
      .min(10, 'Address must be at least 10 characters')
      .regex(/^[a-zA-Z0-9\s,.\-#/()]+$/, 'Address contains invalid characters')
      .trim(),
    city: z.string().min(1, 'City is required').trim(),
    state: z.string().min(1, 'State is required').trim(),
    pincode: z.string().regex(/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode').trim(),
    gstNumber: z.string()
      .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z0-9A-Z]{1}[0-9A-Z]{1}$/i, 'Please enter a correct GST Number')
      .optional()
      .nullable()
      .or(z.literal('')) // Allow empty string
  })
});
