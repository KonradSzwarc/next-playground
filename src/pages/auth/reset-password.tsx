import { useRouter } from 'next/router';
import { useAsync } from 'react-use';

import { trpc } from '@/features/trpc/client';
import { ResetPasswordForm, ResetPasswordFormProps } from '@/modules/auth';
import { resetPasswordSchema } from '@/modules/auth/models';

const querySchema = resetPasswordSchema.pick({ email: true, token: true });

const ResetPasswordPage = () => {
  const router = useRouter();
  const resetPasswordMutation = trpc.auth.resetPassword.useMutation();

  const query = querySchema.safeParse(router.query);
  const shouldRedirect = router.isReady && !query.success;

  useAsync(async () => {
    if (shouldRedirect) await router.push('/auth/login');
  }, [shouldRedirect]);

  if (shouldRedirect) return null;

  const handleSubmit: ResetPasswordFormProps['onSubmit'] = async (values) => {
    if (query.success) {
      await resetPasswordMutation.mutateAsync({
        password: values.password,
        token: query.data.token,
        email: query.data.email,
      });

      await router.push('/auth/login');
    }
  };

  return <ResetPasswordForm onSubmit={handleSubmit} />;
};

export default ResetPasswordPage;
