import { z } from 'zod';

export const orderCreateSchema = z.object({
  body: z.object({
    customerEmail: z.string().email(),
    shippingAddress: z.object({
      fullName: z.string().min(1),
      phoneNumber: z.string().min(10),
      address: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      pincode: z.string().min(5),
    }),
    billingAddress: z.object({
      fullName: z.string().min(1),
      phoneNumber: z.string().min(10),
      address: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      pincode: z.string().min(5),
    }),
    paymentMethod: z.enum(['credit_card', 'debit_card', 'upi', 'cod']),
    items: z.array(
      z.object({
        productName: z.string().min(1),
        quantity: z.number().int().min(1),
        price: z.number().positive(),
      })
    ).min(1),
    totalAmount: z.number().positive(),
  }).refine((data) => {
    const calc = data.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return calc === data.totalAmount;
  }, { message: 'Total amount does not match items', path: ['totalAmount'] })
});

export const adminCouponCreateSchema = z.object({
  body: z.object({
    code: z.string().min(1),
    discount: z.number().positive(),
    expiryDate: z.string().refine((d) => !isNaN(Date.parse(d)) && new Date(d) > new Date(), { message: 'Expiry must be future date' }),
    minOrder: z.number().optional().positive(),
    status: z.enum(['active', 'inactive', 'expired']).optional(),
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
    customerEmail: z.string().email(),
    productId: z.string().min(1)
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
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10),
    gender: z.enum(['male', 'female', 'other']).optional(),
    address: z.string().optional()
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
