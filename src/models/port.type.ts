import isPort from 'validator/lib/isPort';
import { z } from 'zod';

export const portSchema = z.string().refine(isPort, 'Invalid port number').brand('port');

export type Port = z.infer<typeof portSchema>;
