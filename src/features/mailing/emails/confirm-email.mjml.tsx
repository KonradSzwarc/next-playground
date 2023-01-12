import { Mjml, MjmlBody, MjmlColumn, MjmlHead, MjmlSection, MjmlText, MjmlTitle } from '@faire/mjml-react';

interface ConfirmEmailProps {
  code: string;
  subject: string;
}

export const ConfirmEmail = ({ code, subject }: ConfirmEmailProps) => (
  <Mjml>
    <MjmlHead>
      <MjmlTitle>{subject}</MjmlTitle>
    </MjmlHead>
    <MjmlBody width={500}>
      <MjmlSection>
        <MjmlColumn>
          <MjmlText>{code}</MjmlText>
        </MjmlColumn>
      </MjmlSection>
    </MjmlBody>
  </Mjml>
);
