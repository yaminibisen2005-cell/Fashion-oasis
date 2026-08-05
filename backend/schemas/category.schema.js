import { z } from 'zod';

export const categoryCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required').trim()
  })
});
