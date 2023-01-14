import IconGithub from '@/assets/icons/github.svg?component';
import IconGoogle from '@/assets/icons/google.svg?component';
import { signIn } from '@/features/next-auth';
import type { Url } from '@/models';

import type { OAuthProviderUiData } from '../components/oauth-providers';
import type { OAuthProvidersIds } from './auth-page-server-side-props';

export const mapOAuthProviderIdsToUiData = (
  { googleId, githubId }: OAuthProvidersIds,
  callbackUrl?: Url,
): OAuthProviderUiData[] =>
  [
    googleId && {
      id: googleId,
      icon: IconGoogle,
      name: 'Google',
      onClick: () => signIn(googleId, { callbackUrl }),
    },
    githubId && {
      id: githubId,
      icon: IconGithub,
      name: 'Github',
      onClick: () => signIn(githubId, { callbackUrl }),
    },
  ].flatMap((provider) => (provider ? [provider] : []));
