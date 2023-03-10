import type { NextApiHandler } from 'next';
import NextAuth from 'next-auth';

import { getNextAuthParams } from '@/features/next-auth/server';

const handler: NextApiHandler = (...params) => NextAuth(...getNextAuthParams(...params));

export default handler;
