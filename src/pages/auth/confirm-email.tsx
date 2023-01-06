import { useState } from 'react';
import { Button, Flex, Paper, Stack, Text, Title } from '@mantine/core';
import { PinInput } from '@mantine/labs';

const ConfirmEmailPage = () => {
  const [value, setValue] = useState('');

  return (
    <Flex direction="column" align="center" px={16} py={64}>
      <Stack spacing={6} mb={32}>
        <Title align="center">Confirm your email</Title>
        <Text color="dimmed" size="sm" align="center">
          We just sent a confirmation code to your email address.
        </Text>
        <Text color="dimmed" size="sm" align="center">
          Enter it below to confirm your email address.
        </Text>
      </Stack>

      <Paper component="form" radius="md" p="xl" withBorder>
        <PinInput oneTimeCode autoFocus size="xl" type="number" length={6} value={value} onChange={setValue} />

        <Button mt={32} fullWidth>
          Confirm email address
        </Button>
      </Paper>
    </Flex>
  );
};

export default ConfirmEmailPage;
