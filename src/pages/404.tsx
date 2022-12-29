import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = () => ({
  redirect: {
    destination: '/components/button',
    permanent: true,
  },
});

export default getStaticProps;
