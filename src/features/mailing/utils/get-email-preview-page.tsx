import { Container } from '@mantine/core';

export const getEmailPreviewPage = () => {
  const EmailPreviewPage = ({ html }: { html: string }) => (
    <Container
      fluid
      mih="100vh"
      p={0}
      bg="red"
      sx={{ '> div': { minHeight: '100vh' } }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );

  EmailPreviewPage.displayName = 'EmailPreviewPage';

  return EmailPreviewPage;
};
