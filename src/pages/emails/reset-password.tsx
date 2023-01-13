import { getEmailPreviewPage } from '@/features/mailing';
import { getEmailPreviewPageStaticProps } from '@/features/mailing/server';

export const getStaticProps = getEmailPreviewPageStaticProps('ResetPassword', {
  subject: 'Reset your password',
  url: 'https://some-url-to-reset-password.com',
});

export default getEmailPreviewPage();
