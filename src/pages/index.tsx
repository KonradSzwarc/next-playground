import { signIn, signOut, useSession } from 'next-auth/react';
import { Button, Group } from '@mantine/core';

const IndexPage = () => {
  const { data } = useSession();

  return (
    <Group mt={50} position="center">
      {data?.user ? (
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

export default IndexPage;
