import { trpc } from '@/features/trpc/client';
import { ForgotPasswordForm } from '@/modules/auth';
import { authPageServerSideProps } from '@/modules/auth/utils/auth-page-server-side-props';

const ForgotPasswordPage = () => {
  const forgotPasswordMutation = trpc.auth.forgotPassword.useMutation();

  return <ForgotPasswordForm onSubmit={(values) => forgotPasswordMutation.mutateAsync(values)} />;
};

export const getServerSideProps = authPageServerSideProps();

export default ForgotPasswordPage;
