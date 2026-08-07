import { z } from 'zod';

export const productCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').trim(),
    description: z.string().trim().optional(),
    category: z.string().min(1, 'Category is required').trim(),
    price: z.coerce.number().min(0, 'Price must be a positive number'),
    stock: z.coerce.number().min(0, 'Stock must be a positive number').optional(),
    status: z.enum(['Active', 'Inactive']).optional(),
    image: z.string().optional(),
    isFeatured: z.boolean().optional(),
    totalSold: z.coerce.number().min(0).optional(),
    totalRevenue: z.coerce.number().min(0).optional()
  })
});

export const productUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(1).trim().optional(),
    description: z.string().trim().optional(),
    category: z.string().min(1).trim().optional(),
    price: z.coerce.number().min(0).optional(),
    stock: z.coerce.number().min(0).optional(),
    status: z.enum(['Active', 'Inactive']).optional(),
    image: z.string().min(1).optional(),
    isFeatured: z.boolean().optional()
  })
});
