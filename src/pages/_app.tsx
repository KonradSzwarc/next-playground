import type { AppProps } from 'next/app';

import { ThemeProvider } from '@/components/theme-provider';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
