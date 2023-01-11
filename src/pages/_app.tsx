import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { trpc } from '@/features/trpc/client';
import { ThemeProvider } from '@/features/ui';

interface CustomProps {
  session: Session | null;
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps<CustomProps>) => (
  <SessionProvider session={session}>
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  </SessionProvider>
);

export default trpc.withTRPC(App);
