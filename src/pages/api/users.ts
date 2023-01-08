import type { NextApiHandler } from 'next';

import { Entities, prisma } from '@/server/db';

const handler: NextApiHandler<Entities.User[]> = async (_req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
};

export default handler;
