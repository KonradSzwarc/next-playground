import Link from 'next/link';
import type { SubmitHandler } from 'react-hook-form';
import { Anchor, Button, Flex, Group, Paper, PasswordInput, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';

import { useForm } from '@/features/forms';

import { ResetPasswordDto, resetPasswordSchema } from '../models';

export interface ResetPasswordFormProps {
  onSubmit: SubmitHandler<ResetPasswordDto>;
}

export const ResetPasswordForm = ({ onSubmit }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ schema: resetPasswordSchema });

  return (
    <Flex direction="column" align="center" px={16} py={64}>
      <Stack spacing={6} mb={32}>
        <Title align="center">Password reset</Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your new password twice to reset it
        </Text>
      </Stack>

      <Paper onSubmit={handleSubmit(onSubmit)} component="form" radius="md" p="xl" withBorder w="min(420px, 100%)">
        <Stack>
          <PasswordInput
            {...register('password')}
            error={errors.password?.message}
            withAsterisk
            label="New password"
            placeholder="Your new password"
          />
          <PasswordInput
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            withAsterisk
            label="Confirm new password"
            placeholder="Repeat your new password"
          />
        </Stack>

        <Group position="apart" mt={32}>
          <Anchor component={Link} href="/auth/login" color="dimmed" size="sm">
            <Group spacing={4}>
              <IconArrowLeft size={16} />
              Back to login page
            </Group>
          </Anchor>
          <Button type="submit">Reset password</Button>
        </Group>
      </Paper>
    </Flex>
  );
};
