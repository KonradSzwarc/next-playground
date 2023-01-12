import { getEmailPreviewPage } from '@/features/mailing';
import { getEmailPreviewPageStaticProps } from '@/features/mailing/server';

export const getStaticProps = getEmailPreviewPageStaticProps('ConfirmEmail', {
  subject: 'Confirm your email',
  code: '123456',
});

export default getEmailPreviewPage();
