import { ComponentProps, createElement } from 'react';
import { render } from '@faire/mjml-react/utils/render';

import * as emails from '../emails';

export const getEmailPreviewPageStaticProps =
  <TemplateName extends keyof typeof emails>(
    template: TemplateName,
    data: ComponentProps<typeof emails[TemplateName]>,
  ) =>
  () => {
    if (process.env.NODE_ENV === 'production') {
      return { notFound: true };
    }

    const { html } = render(createElement(emails[template], data));

    return { props: { html } };
  };
