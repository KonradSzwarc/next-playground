import { MjmlColumn, MjmlSection, MjmlText } from '@faire/mjml-react';

import { EmailLayout, EmailLayoutProps } from '../components';

interface ConfirmEmailProps extends EmailLayoutProps {
  code: string;
}

export const ConfirmEmail = ({ code, subject }: ConfirmEmailProps) => (
  <EmailLayout subject={subject}>
    <MjmlSection backgroundColor="#FFFFFF" borderRadius="0 0 12px 12px">
      <MjmlColumn>
        <MjmlText fontSize={16}>Thank you for registering in Next Playground!</MjmlText>
        <MjmlText fontSize={16}>Your account confirmation code is</MjmlText>
        <MjmlText fontSize={24} fontWeight="700">
          {code}
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
  </EmailLayout>
);
