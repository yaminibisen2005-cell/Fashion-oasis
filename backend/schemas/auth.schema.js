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
