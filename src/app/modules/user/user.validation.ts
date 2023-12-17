import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be a string' })
    .max(20, { message: 'O vai ebar to thamen, pore mone thakbe na!' })
    .optional(),
});

export const UserValidations = {
  userValidationSchema,
};
