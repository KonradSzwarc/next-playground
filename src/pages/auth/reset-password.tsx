import Link from 'next/link';
import { Anchor, Button, Flex, Group, Paper, PasswordInput, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { object } from 'zod';

import { useForm } from '@/hooks/use-form';
import { validators } from '@/shared/validators';

const resetPasswordFormSchema = object({
  password: validators.password,
  confirmPassword: validators.password,
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ schema: resetPasswordFormSchema });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <Flex direction="column" align="center" px={16} py={64}>
      <Stack spacing={6} mb={32}>
        <Title align="center">Password reset</Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your new password twice to reset it
        </Text>
      </Stack>

      <Paper onSubmit={onSubmit} component="form" radius="md" p="xl" withBorder w="min(420px, 100%)">
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

export default ResetPasswordPage;
