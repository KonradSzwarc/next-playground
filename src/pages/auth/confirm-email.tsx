import { useRouter } from 'next/router';
import { useAsync } from 'react-use';
import { z } from 'zod';

import { trpc } from '@/features/trpc/client';
import { emailSchema } from '@/models';
import { ConfirmEmailForm, ConfirmEmailFormProps } from '@/modules/auth';

const querySchema = z.object({
  email: emailSchema,
});

const useQuery = () => {
  const router = useRouter();
  const parsedQuery = querySchema.safeParse(router.query);

  return { email: parsedQuery.success ? parsedQuery.data.email : undefined };
};

const ConfirmEmailPage = () => {
  const { email } = useQuery();
  const router = useRouter();
  const confirmEmailMutation = trpc.auth.confirmEmail.useMutation();

  useAsync(async () => {
    if (!email) await router.push('/auth/login');
  }, [email]);

  if (!email) return null;

  const handleSubmit: ConfirmEmailFormProps['onSubmit'] = async (values) => {
    await confirmEmailMutation.mutateAsync(values);
    await router.push('/auth/login');
  };

  return <ConfirmEmailForm email={email} onSubmit={handleSubmit} />;
};

export default ConfirmEmailPage;
