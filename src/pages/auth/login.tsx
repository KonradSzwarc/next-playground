import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getProviders, signIn } from 'next-auth/react';
import {
  Anchor,
  Button,
  ButtonProps,
  Divider,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { z } from 'zod';

import { Github, Google } from '@/generated/icons';
import { useForm } from '@/hooks/use-form';
import { getServerSideSession } from '@/server/auth';
import { validators } from '@/shared/validators';

const querySchema = z.object({
  callbackUrl: z.string().url().optional(),
});

const useQuery = () => {
  const { query } = useRouter();
  const parsedQuery = querySchema.safeParse(query);

  return parsedQuery.success ? parsedQuery.data : {};
};

const loginFormSchema = z.object({
  email: validators.email,
  password: validators.password,
});

const LoginPage = ({ providerIds }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ schema: loginFormSchema });
  const { callbackUrl } = useQuery();

  const onSubmit = handleSubmit(async (values) => {
    await signIn('credentials', { ...values, callbackUrl });
  });

  const oAuthButtonProps = { variant: 'default', color: 'gray', radius: 'xl' } satisfies ButtonProps;
  const oAuthButtons = [
    { providerId: providerIds.google, Icon: Google, children: 'Google', ...oAuthButtonProps },
    { providerId: providerIds.github, Icon: Github, children: 'Github', ...oAuthButtonProps },
  ];

  return (
    <Flex direction="column" align="center" px={16} py={64}>
      <Stack spacing={6} mb={32}>
        <Title align="center">Login to the app</Title>
        <Text color="dimmed" size="sm" align="center">
          Do not have an account yet?{' '}
          <Anchor component={Link} href="/auth/register">
            Create one
          </Anchor>
        </Text>
      </Stack>

      <Paper onSubmit={onSubmit} component="form" radius="md" p="xl" withBorder w="min(420px, 100%)">
        <Group grow mb="md">
          {oAuthButtons.map(
            ({ providerId, Icon, ...props }) =>
              providerId && (
                <Button
                  key={providerId}
                  onClick={() => signIn(providerId, { callbackUrl })}
                  leftIcon={<Icon width={16} height={16} />}
                  {...props}
                />
              ),
          )}
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <Stack>
          <TextInput
            {...register('email')}
            error={errors.email?.message}
            withAsterisk
            label="Email"
            placeholder="Your email address"
          />
          <PasswordInput
            {...register('password')}
            error={errors.password?.message}
            withAsterisk
            label="Password"
            placeholder="Your password"
          />
        </Stack>

        <Group position="apart" mt={32}>
          <Anchor component={Link} href="/auth/forgot-password" color="dimmed" size="sm">
            I forgot my password
          </Anchor>
          <Button type="submit" w={136}>
            Login
          </Button>
        </Group>
      </Paper>
    </Flex>
  );
};

export const getServerSideProps = (async ({ req, res }) => {
  const [providers, session] = await Promise.all([getProviders(), getServerSideSession(req, res)]);

  return session
    ? { redirect: { destination: '/', permanent: false } }
    : { props: { providerIds: { github: providers?.github.id, google: providers?.google.id } } };
}) satisfies GetServerSideProps;

export default LoginPage;
