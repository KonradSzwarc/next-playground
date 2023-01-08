import type { NextApiHandler } from 'next';
import NextAuth from 'next-auth';

import { getNextAuthParams } from '@/server/auth';

const handler: NextApiHandler = (...params) => NextAuth(...getNextAuthParams(...params));

export default handler;
