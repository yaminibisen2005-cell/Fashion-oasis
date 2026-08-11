 import { z } from 'zod';

export const orderCreateSchema = z.object({
  body: z.object({
    customerEmail: z.string().email(),
    shippingAddress: z.object({
      fullName: z.string().min(1, 'Full name is required'),
      phoneNumber: z.string().min(1, 'Phone number is required'),
      address: z.string().min(1, 'Address is required'),
      addressLine2: z.string().optional(),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      pincode: z.string().min(1, 'Pincode is required'),
    }),
    billingAddress: z.object({
      fullName: z.string().min(1, 'Full name is required'),
      phoneNumber: z.string().min(1, 'Phone number is required'),
      address: z.string().min(1, 'Address is required'),
      addressLine2: z.string().optional(),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      pincode: z.string().min(1, 'Pincode is required'),
    }).optional().nullable(),
    paymentMethod: z.string().min(1),
    items: z.array(
      z.object({
        productName: z.string().min(1),
        quantity: z.number().int().min(1),
        price: z.number().positive(),
        image: z.string().optional(),
      })
    ).min(1, 'At least one item is required'),
    totalAmount: z.number().positive(),
  })
});

export const adminCouponCreateSchema = z.object({
  body: z.object({
    code: z.string().min(1),
    discount: z.number().positive(),
    expiryDate: z.string().refine((d) => !isNaN(Date.parse(d)) && new Date(d) > new Date(), { message: 'Expiry must be future date' }),
    minOrder: z.number().positive().optional(),
    status: z.enum(['Active', 'Inactive', 'Expired']).optional(),
  })
});

export const adminOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
  })
});

export const adminToggleStatusSchema = z.object({
  body: z.object({
    status: z.enum(['active', 'inactive'])
  })
});

 export const wishlistToggleSchema = z.object({
  body: z.object({
    product: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      image: z.string().optional(), // Changed from z.string().url().optional()
      price: z.number().positive().optional(),
      oldPrice: z.number().positive().optional()
    })
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email()
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    password: z.string().min(8).regex(/[A-Z]/, 'Must contain uppercase').regex(/[a-z]/, 'Must contain lowercase').regex(/[0-9]/, 'Must contain number').regex(/[^A-Za-z0-9]/, 'Must contain special char')
  })
});

export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required').optional(),
    lastName: z.string().optional().or(z.literal('')),
    email: z.string().email('Invalid email address').optional(),
    phone: z.string().optional().or(z.literal('')),
    gender: z.enum(['Male', 'Female', 'Other', '']).optional(),
    dob: z.string().optional().or(z.literal('')),
    address: z.string().optional().or(z.literal('')),
    originalEmail: z.string().optional().or(z.literal(''))
  })
});

export const updatePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/)
  })
});

export const updateTwoFactorSchema = z.object({
  body: z.object({
    twoFactorEnabled: z.boolean()
  })
});

export const deleteAccountSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
});