import type { GetServerSideProps } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button, Group, Stack, Text } from '@mantine/core';

import { getServerSideSession } from '@/features/next-auth/server';
import { trpc } from '@/features/trpc/client';

const IndexPage = () => {
  const { data, status } = useSession();
  const message = trpc.example.getMessage.useQuery({ text: 'from tRPC' });
  const secretMessage = trpc.example.getSecretMessage.useQuery(undefined, { enabled: status === 'authenticated' });

  return (
    <Stack mt={48} w="fit-content" mx="auto">
      <Text align="center">
        <b>Greeting:</b> {message.data?.greeting ?? 'loading'}
      </Text>
      <Text align="center">
        <b>Secret message:</b> {secretMessage.data ?? 'none'}
      </Text>
      <Group mt={24} position="center">
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
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    session: await getServerSideSession(req, res),
  },
});

export default IndexPage;
