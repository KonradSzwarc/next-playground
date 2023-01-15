import type { ComponentProps, FC, ReactElement } from 'react';
import { render } from '@faire/mjml-react/utils/render';
import nodemailer, { SendMailOptions } from 'nodemailer';

import { serverEnv } from '@/features/env/server';

import * as emails from '../emails';

interface SendEmailProps<TemplateName extends keyof typeof emails> {
  from?: SendMailOptions['from'];
  to: NonNullable<SendMailOptions['to']>;
  subject: string;
  template: TemplateName;
  data: Omit<ComponentProps<(typeof emails)[TemplateName]>, 'subject'>;
}

export const sendEmail = async <TemplateName extends keyof typeof emails>({
  from,
  to,
  subject,
  template,
  data,
}: SendEmailProps<TemplateName>) => {
  const transporter = nodemailer.createTransport({ ...serverEnv.email.config, secure: false });

  const component = emails[template] as (props: ComponentProps<FC>) => ReactElement;
  const { html, errors } = render(component({ ...data, subject }), {
    validationLevel: 'strict',
    keepComments: 'false',
  });

  if (errors && errors.length > 0) {
    console.error(errors);
    throw new Error('Email template is invalid');
  }

  const mailOptions: SendMailOptions = {
    to,
    subject,
    from: from ?? serverEnv.email.from,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (exception) {
    console.error(exception);
    throw new Error('Email could not be sent');
  }
};
