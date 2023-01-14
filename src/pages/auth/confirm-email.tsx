import { useRouter } from 'next/router';
import { useAsync } from 'react-use';
import { z } from 'zod';

import { trpc } from '@/features/trpc/client';
import { emailSchema } from '@/models';
import { ConfirmEmailForm, ConfirmEmailFormProps } from '@/modules/auth';
import { authPageServerSideProps } from '@/modules/auth/utils/auth-page-server-side-props';

const querySchema = z.object({
  email: emailSchema,
});

const ConfirmEmailPage = () => {
  const router = useRouter();
  const confirmEmailMutation = trpc.auth.confirmEmail.useMutation();

  const query = querySchema.safeParse(router.query);

  useAsync(async () => {
    if (!query.success) await router.push('/auth/login');
  }, [query.success]);

  if (!query.success) return null;

  const handleSubmit: ConfirmEmailFormProps['onSubmit'] = async (values) => {
    await confirmEmailMutation.mutateAsync({
      code: values.code,
      email: query.data.email,
    });
    await router.push('/auth/login');
  };

  return <ConfirmEmailForm onSubmit={handleSubmit} />;
};

export const getServerSideProps = authPageServerSideProps();

export default ConfirmEmailPage;
