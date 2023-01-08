import type { GetServerSideProps } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button, Group } from '@mantine/core';

import { getServerSideSession } from '@/server/auth';

const IndexPage = () => {
  const { data, status } = useSession();

  return (
    <Group mt={50} position="center">
      {status === 'authenticated' ? (
        <Button size="xl" onClick={() => signOut()}>
          Sign out {data.user.name}
        </Button>
      ) : (
        <Button size="xl" onClick={() => signIn()}>
          Sign in
        </Button>
      )}
    </Group>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    session: await getServerSideSession(req, res),
  },
});

export default IndexPage;
