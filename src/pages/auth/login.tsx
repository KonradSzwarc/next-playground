import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { z } from 'zod';

import { IconGithub, IconGoogle } from '@/components/icons';
import { getProviders, signIn } from '@/features/next-auth';
import { getServerSideSession } from '@/features/next-auth/server';
import { urlSchema } from '@/models';
import { LoginForm, LoginFormProps } from '@/modules/auth';

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

  const oAuthProviders: LoginFormProps['oAuthProviders'] = [
    providerIds.google && {
      id: providerIds.google,
      icon: IconGoogle,
      name: 'Google',
      onClick: () => signIn(providerIds.google, { callbackUrl }),
    },
    providerIds.github && {
      id: providerIds.github,
      icon: IconGithub,
      name: 'Github',
      onClick: () => signIn(providerIds.github, { callbackUrl }),
    },
  ].flatMap((provider) => (provider ? [provider] : []));

  return <LoginForm onSubmit={handleSubmit} oAuthProviders={oAuthProviders} />;
};

export const getServerSideProps = (async ({ req, res }) => {
  const [providers, session] = await Promise.all([getProviders(), getServerSideSession(req, res)]);

  return session
    ? { redirect: { destination: '/', permanent: false } }
    : { props: { providerIds: { github: providers?.github.id, google: providers?.google.id } } };
}) satisfies GetServerSideProps;

export default LoginPage;
