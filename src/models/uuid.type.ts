import { z } from 'zod';

export const uuidSchema = z.string().uuid('Invalid UUID').brand('uuid');

export type Uuid = z.infer<typeof uuidSchema>;
