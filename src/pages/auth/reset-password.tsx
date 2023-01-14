import { useRouter } from 'next/router';
import { useAsync } from 'react-use';

import { trpc } from '@/features/trpc/client';
import { ResetPasswordForm, ResetPasswordFormProps } from '@/modules/auth';
import { resetPasswordSchema } from '@/modules/auth/models';
import { authPageServerSideProps } from '@/modules/auth/utils/auth-page-server-side-props';

const querySchema = resetPasswordSchema.pick({ email: true, token: true });

const ResetPasswordPage = () => {
  const router = useRouter();
  const resetPasswordMutation = trpc.auth.resetPassword.useMutation();

  const query = querySchema.safeParse(router.query);

  useAsync(async () => {
    if (!query.success) await router.push('/auth/login');
  }, [query.success]);

  if (!query.success) return null;

  const handleSubmit: ResetPasswordFormProps['onSubmit'] = async (values) => {
    await resetPasswordMutation.mutateAsync({
      password: values.password,
      token: query.data.token,
      email: query.data.email,
    });

    await router.push('/auth/login');
  };

  return <ResetPasswordForm onSubmit={handleSubmit} />;
};

export const getServerSideProps = authPageServerSideProps();

export default ResetPasswordPage;
