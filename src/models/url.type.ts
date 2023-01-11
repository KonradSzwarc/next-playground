import { z } from 'zod';

export const urlSchema = z.string().url('Invalid URL address').brand('url');

export type Url = z.infer<typeof urlSchema>;
