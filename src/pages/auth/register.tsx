import type { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { trpc } from '@/features/trpc/client';
import { RegisterForm, RegisterFormProps } from '@/modules/auth';
import { authPageServerSidePropsWithOAuthProviderIds } from '@/modules/auth/utils/auth-page-server-side-props';
import { mapOAuthProviderIdsToUiData } from '@/modules/auth/utils/map-auth-provider-ids-to-ui-data';

const RegisterPage = ({ providerIds }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const registerMutation = trpc.auth.register.useMutation();

  const handleSubmit: RegisterFormProps['onSubmit'] = async (values) => {
    await registerMutation.mutateAsync(values);
    await router.push({ pathname: '/auth/confirm-email', query: { email: values.email } });
  };

  const oAuthProviders = mapOAuthProviderIdsToUiData(providerIds);

  return <RegisterForm onSubmit={handleSubmit} oAuthProviders={oAuthProviders} />;
};

export const getServerSideProps = authPageServerSidePropsWithOAuthProviderIds();

export default RegisterPage;
