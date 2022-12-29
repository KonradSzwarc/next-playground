import '../styles/globals.css';

import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';

const inter = Inter({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <style jsx global>{`
      :root {
        --inter-font-family: ${inter.style.fontFamily};
      }
    `}</style>
    <Component {...pageProps} />
  </>
);

export default App;
