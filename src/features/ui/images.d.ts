declare module '*.svg?component' {
  import { ComponentType, ComponentPropsWithRef } from 'react';

  export const ReactComponent: ComponentType<ComponentPropsWithRef<'svg'>>;

  export default ReactComponent;
}

// Created only to provide type checking for static image imports
// By default SVG imports in Next.js are typed as any
declare module '*.svg?static' {
  const content: import('next/image').StaticImageData;

  export default content;
}
