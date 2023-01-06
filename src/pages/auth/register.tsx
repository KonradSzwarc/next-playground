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

import { Github, Google } from '@/generated/icons';

const RegisterPage = () => (
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

    <Paper component="form" radius="md" p="xl" withBorder w="min(420px, 100%)">
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
        <TextInput withAsterisk label="Name" placeholder="Your name" />
        <TextInput withAsterisk label="Email" placeholder="Your email address" />
        <PasswordInput withAsterisk label="Password" placeholder="Your password" />
      </Stack>

      <Button type="submit" mt={32} fullWidth>
        Register
      </Button>
    </Paper>
  </Flex>
);

export default RegisterPage;
