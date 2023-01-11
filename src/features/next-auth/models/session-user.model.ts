import { z } from 'zod';

import { emailSchema, nonEmptyStringSchema, urlSchema, uuidSchema } from '@/models';

export const sessionUserSchema = z.object({
  id: uuidSchema,
  name: nonEmptyStringSchema,
  email: emailSchema,
  image: urlSchema,
});

export type SessionUser = z.infer<typeof sessionUserSchema>;
