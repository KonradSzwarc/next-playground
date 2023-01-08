import { z } from 'zod';

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  image: z.string().url(),
});

export const User = {
  from: (data: unknown) => userSchema.parse(data),
  schema: userSchema,
};

export type User = z.infer<typeof userSchema>;
