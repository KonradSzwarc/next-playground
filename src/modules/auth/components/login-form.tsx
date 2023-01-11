import Link from 'next/link';
import type { ComponentPropsWithRef, ComponentType } from 'react';
import type { SubmitHandler } from 'react-hook-form';
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
import { z } from 'zod';

import { useForm } from '@/features/forms';
import { emailSchema } from '@/models';

import { passwordSchema } from '../models';

interface OAuthProvider {
  id: string;
  name: string;
  icon: ComponentType<ComponentPropsWithRef<'svg'>>;
  onClick: () => void;
}

export interface LoginFormProps {
  onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>>;
  oAuthProviders: OAuthProvider[];
}

const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const LoginForm = ({ onSubmit, oAuthProviders }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ schema: loginFormSchema });

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

      <Paper onSubmit={handleSubmit(onSubmit)} component="form" radius="md" p="xl" withBorder w="min(420px, 100%)">
        <Group grow mb="md">
          {oAuthProviders.map(({ id, name, icon: Icon, onClick }) => (
            <Button
              key={id}
              onClick={onClick}
              leftIcon={<Icon width={16} height={16} />}
              variant="default"
              color="gray"
              radius="xl"
            >
              {name}
            </Button>
          ))}
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
