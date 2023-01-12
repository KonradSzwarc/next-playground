import { Controller, SubmitHandler } from 'react-hook-form';
import { Button, Flex, Input, Paper, Stack, Text, Title } from '@mantine/core';
import { PinInput } from '@mantine/labs';

import { useForm } from '@/features/forms';
import type { Email } from '@/models';

import { ConfirmEmailDto, confirmEmailSchema, EMAIL_CONFIRMATION_CODE_LENGTH } from '../models';

export interface ConfirmEmailFormProps {
  onSubmit: SubmitHandler<ConfirmEmailDto>;
  email: Email;
}

export const ConfirmEmailForm = ({ onSubmit, email }: ConfirmEmailFormProps) => {
  const { control, handleSubmit } = useForm({ schema: confirmEmailSchema, defaultValues: { email } });

  return (
    <Flex direction="column" align="center" px={16} py={64}>
      <Stack spacing={6} mb={32}>
        <Title align="center">Confirm your email</Title>
        <Text color="dimmed" size="sm" align="center">
          We just sent a confirmation code to your email address. <br />
          Enter it below to confirm your email address.
        </Text>
      </Stack>

      <Paper onSubmit={handleSubmit(onSubmit)} component="form" radius="md" p="xl" withBorder>
        <Controller
          control={control}
          name="code"
          render={({ field, fieldState }) => (
            <Input.Wrapper error={fieldState.error?.message}>
              <PinInput
                {...field}
                oneTimeCode
                autoFocus
                size="xl"
                type="number"
                length={EMAIL_CONFIRMATION_CODE_LENGTH}
                invalid={Boolean(fieldState.error?.message)}
              />
            </Input.Wrapper>
          )}
        />

        <Button type="submit" mt={32} fullWidth>
          Confirm email address
        </Button>
      </Paper>
    </Flex>
  );
};
