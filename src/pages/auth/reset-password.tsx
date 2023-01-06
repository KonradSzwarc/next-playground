import Link from 'next/link';
import { Anchor, Button, Flex, Group, Paper, PasswordInput, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';

const ForgotPasswordPage = () => (
  <Flex direction="column" align="center" px={16} py={64}>
    <Stack spacing={6} mb={32}>
      <Title align="center">Password reset</Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your new password twice to reset it
      </Text>
    </Stack>

    <Paper component="form" radius="md" p="xl" withBorder w="min(420px, 100%)">
      <Stack>
        <PasswordInput withAsterisk label="New password" placeholder="Your new password" />
        <PasswordInput withAsterisk label="Confirm new password " placeholder="Repeat your new password" />
      </Stack>

      <Group position="apart" mt={32}>
        <Anchor component={Link} href="/auth/login" color="dimmed" size="sm">
          <Group spacing={4}>
            <IconArrowLeft size={16} />
            Back to login page
          </Group>
        </Anchor>
        <Button>Reset password</Button>
      </Group>
    </Paper>
  </Flex>
);

export default ForgotPasswordPage;
