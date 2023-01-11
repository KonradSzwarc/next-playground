import Link from 'next/link';
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

import { IconGithub, IconGoogle } from '@/components/icons';
import { useForm } from '@/features/forms';

import { RegisterDto, registerSchema } from '../models';

export interface RegisterFormProps {
  onSubmit: SubmitHandler<RegisterDto>;
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ schema: registerSchema });

  return (
    <Flex direction="column" align="center" px={16} py={64}>
      <Stack spacing={6} mb={32}>
        <Title align="center">Register to the app</Title>
        <Text color="dimmed" size="sm" align="center">
          Already have an account?{' '}
          <Anchor component={Link} href="/auth/login">
            Login
          </Anchor>
        </Text>
      </Stack>

      <Paper onSubmit={handleSubmit(onSubmit)} component="form" radius="md" p="xl" withBorder w="min(420px, 100%)">
        <Group grow mb="md">
          <Button leftIcon={<IconGoogle width={16} height={16} />} variant="default" color="gray" radius="xl">
            Google
          </Button>
          <Button leftIcon={<IconGithub width={16} height={16} />} variant="default" color="gray" radius="xl">
            Github
          </Button>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <Stack>
          <TextInput
            {...register('name')}
            error={errors.name?.message}
            withAsterisk
            label="Name"
            placeholder="Your name"
          />
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

        <Button type="submit" mt={32} fullWidth>
          Register
        </Button>
      </Paper>
    </Flex>
  );
};
