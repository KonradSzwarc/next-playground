import type { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { getNextAuthParams } from './get-next-auth-params';

export const getServerSideSession = async (
  req: GetServerSidePropsContext['req'],
  res: GetServerSidePropsContext['res'],
) => unstable_getServerSession(...getNextAuthParams(req, res));
