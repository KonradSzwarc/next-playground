import { MjmlButton, MjmlColumn, MjmlSection, MjmlText } from '@faire/mjml-react';

import { EmailLayout, EmailLayoutProps } from '../components';

interface ResetPasswordProps extends EmailLayoutProps {
  url: string;
}

export const ResetPassword = ({ url, subject }: ResetPasswordProps) => (
  <EmailLayout subject={subject}>
    <MjmlSection backgroundColor="#FFFFFF" borderRadius="0 0 12px 12px">
      <MjmlColumn>
        <MjmlText fontSize={16}>Click the button below to create a new password</MjmlText>
        <MjmlButton align="left" href={url}>
          Create new password
        </MjmlButton>
      </MjmlColumn>
    </MjmlSection>
  </EmailLayout>
);
