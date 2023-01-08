import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@/components/theme-provider';

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

export default App;
