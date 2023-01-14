import type { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { signIn } from '@/features/next-auth';
import { urlSchema } from '@/models';
import { LoginForm, LoginFormProps } from '@/modules/auth';
import { authPageServerSidePropsWithOAuthProviderIds } from '@/modules/auth/utils/auth-page-server-side-props';
import { mapOAuthProviderIdsToUiData } from '@/modules/auth/utils/map-auth-provider-ids-to-ui-data';

const querySchema = z.object({
  callbackUrl: urlSchema.optional(),
});

const useQuery = () => {
  const { query } = useRouter();
  const parsedQuery = querySchema.safeParse(query);

  return parsedQuery.success ? parsedQuery.data : {};
};

const LoginPage = ({ providerIds }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { callbackUrl } = useQuery();

  const handleSubmit: LoginFormProps['onSubmit'] = async (values) => {
    await signIn('credentials', { ...values, callbackUrl });
  };

  const oAuthProviders = mapOAuthProviderIdsToUiData(providerIds, callbackUrl);

  return <LoginForm onSubmit={handleSubmit} oAuthProviders={oAuthProviders} />;
};

export const getServerSideProps = authPageServerSidePropsWithOAuthProviderIds();

export default LoginPage;
