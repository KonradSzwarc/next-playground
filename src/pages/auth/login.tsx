import Link from 'next/link';
import {
  Anchor,
  Button,
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
import { object } from 'zod';

import { Github, Google } from '@/generated/icons';
import { useForm } from '@/hooks/use-form';
import { validators } from '@/shared/validators';

const loginFormSchema = object({
  email: validators.email,
  password: validators.password,
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ schema: loginFormSchema });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

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
          <Button leftIcon={<Google width={16} height={16} />} variant="default" color="gray" radius="xl">
            Google
          </Button>
          <Button leftIcon={<Github width={16} height={16} />} variant="default" color="gray" radius="xl">
            Github
          </Button>
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

export default LoginPage;
