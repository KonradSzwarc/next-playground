import type { NextApiHandler } from 'next';

import { db, Entities } from '@/server/db';

const handler: NextApiHandler<Entities.User[]> = async (_req, res) => {
  const users = await db.user.findMany();

  res.status(200).json(users);
};

export default handler;
