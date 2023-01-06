import { string } from 'zod';

export const validators = {
  email: string().email('Invalid email address'),
  password: string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/(?=.*?[!#$%&()*+=@^_-])/, 'Password must contain at least one special character'),
};
