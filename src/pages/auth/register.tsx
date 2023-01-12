import { useRouter } from 'next/router';

import { trpc } from '@/features/trpc/client';
import { RegisterForm, RegisterFormProps } from '@/modules/auth';

const RegisterPage = () => {
  const router = useRouter();
  const registerMutation = trpc.auth.register.useMutation();

  const handleSubmit: RegisterFormProps['onSubmit'] = async (values) => {
    await registerMutation.mutateAsync(values);
    await router.push({ pathname: '/auth/confirm-email', query: { email: values.email } });
  };

  return <RegisterForm onSubmit={handleSubmit} />;
};

export default RegisterPage;
