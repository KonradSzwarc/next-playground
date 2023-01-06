import Link from 'next/link';
import { Anchor, Button, Flex, Group, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { object } from 'zod';

import { useForm } from '@/hooks/use-form';
import { validators } from '@/shared/validators';

const forgotPasswordFormSchema = object({
  email: validators.email,
});

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ schema: forgotPasswordFormSchema });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <Flex direction="column" align="center" px={16} py={64}>
      <Stack spacing={6} mb={32}>
        <Title align="center">Forgot your password?</Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>
      </Stack>

      <Paper onSubmit={onSubmit} component="form" radius="md" p="xl" withBorder w="min(420px, 100%)">
        <TextInput
          {...register('email')}
          error={errors.email?.message}
          withAsterisk
          label="Email"
          placeholder="Your email address"
        />

        <Group position="apart" mt={32}>
          <Anchor component={Link} href="/auth/login" color="dimmed" size="sm">
            <Group spacing={4}>
              <IconArrowLeft size={16} />
              Back to login page
            </Group>
          </Anchor>
          <Button type="submit">Send password reset link</Button>
        </Group>
      </Paper>
    </Flex>
  );
};

export default ForgotPasswordPage;
