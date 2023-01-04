import { Head, Html, Main, NextScript } from 'next/document';
import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();
const Document = () => (
  <Html lang="en">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

Document.getInitialProps = getInitialProps;

export default Document;
