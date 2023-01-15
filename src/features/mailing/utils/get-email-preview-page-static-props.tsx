import { ComponentProps, createElement, FC } from 'react';
import { render } from '@faire/mjml-react/utils/render';

import { serverEnv } from '@/features/env/server';

import * as emails from '../emails';

export const getEmailPreviewPageStaticProps =
  <TemplateName extends keyof typeof emails>(
    template: TemplateName,
    data: ComponentProps<(typeof emails)[TemplateName]>,
  ) =>
  () => {
    if (serverEnv.node.is.production) {
      return { notFound: true };
    }

    const component = emails[template] as FC<any>;
    const { html } = render(createElement(component, data));

    return { props: { html } };
  };
