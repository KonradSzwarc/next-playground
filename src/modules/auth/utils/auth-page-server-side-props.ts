import type { GetServerSideProps } from 'next';
import { getProviders } from 'next-auth/react';

import { getServerSideSession } from '@/features/next-auth/server';

export interface OAuthProvidersIds {
  googleId?: string;
  githubId?: string;
}

export const authPageServerSideProps = () =>
  (async ({ req, res }) => {
    const session = await getServerSideSession(req, res);

    return session ? { redirect: { destination: '/', permanent: false } } : { props: {} };
  }) satisfies GetServerSideProps;

export const authPageServerSidePropsWithOAuthProviderIds = () =>
  (async ({ req, res }) => {
    const [providers, session] = await Promise.all([getProviders(), getServerSideSession(req, res)]);

    const providerIds: OAuthProvidersIds = { githubId: providers?.github.id, googleId: providers?.google.id };

    return session ? { redirect: { destination: '/', permanent: false } } : { props: { providerIds } };
  }) satisfies GetServerSideProps;
