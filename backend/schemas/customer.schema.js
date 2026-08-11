 import { z } from 'zod';

 export const customerRegisterSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required').trim(),
    lastName: z.string().min(1, 'Last name is required').trim(),
    email: z.string().email('Invalid email'),
    phone: z.string().optional().or(z.literal('')), // <-- Make sure this is inside body
    password: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Must contain uppercase').regex(/[a-z]/, 'Must contain lowercase').regex(/[0-9]/, 'Must contain number').regex(/[^A-Za-z0-9]/, 'Must contain special char'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters')
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
});
export const customerLoginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required')
  })
});

export const customerGoogleAuthSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Firebase ID token is required'),
    name: z.string().optional(),
    email: z.string().email('Invalid email').optional(),
    photo: z.string().url('Invalid photo URL').optional()
  })
});