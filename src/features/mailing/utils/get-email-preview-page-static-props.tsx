import { ComponentProps, createElement, FC } from 'react';
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

    const component = emails[template] as FC<any>;
    const { html } = render(createElement(component, data));

    return { props: { html } };
  };
