import { trpc } from '@/features/trpc/client';
import { ForgotPasswordForm } from '@/modules/auth';

const ForgotPasswordPage = () => {
  const forgotPasswordMutation = trpc.auth.forgotPassword.useMutation();

  return <ForgotPasswordForm onSubmit={(values) => forgotPasswordMutation.mutateAsync(values)} />;
};

export default ForgotPasswordPage;
