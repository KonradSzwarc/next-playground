import type { NextApiHandler } from 'next';

import { db, UserEntity } from '@/server/db';

const handler: NextApiHandler<UserEntity[]> = async (_req, res) => {
  const users = await db('users').select('*');

  res.status(200).json(users);
};

export default handler;
