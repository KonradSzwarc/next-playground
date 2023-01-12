import type { PropsWithChildren } from 'react';
import { Mjml, MjmlBody, MjmlFont, MjmlHead, MjmlTitle } from '@faire/mjml-react';

export interface EmailLayoutProps {
  subject: string;
}

export const EmailLayout = ({ subject, children }: PropsWithChildren<EmailLayoutProps>) => (
  <Mjml>
    <MjmlHead>
      <MjmlTitle>{subject}</MjmlTitle>
      <MjmlFont name="Inter" href="https://fonts.googleapis.com/css2?family=Inter" />
    </MjmlHead>
    <MjmlBody backgroundColor="#E9ECEF">{children}</MjmlBody>
  </Mjml>
);
