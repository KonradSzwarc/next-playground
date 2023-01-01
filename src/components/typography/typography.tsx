import { ElementType, forwardRef, ReactElement } from 'react';

import type { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../types/polymorphic';
import { mergeClasses } from '../../utils/styles';
import { getTypographyClasses, TypographyStylesProps } from './typography.styles';

export type TypographyProps<C extends ElementType> = PolymorphicComponentPropWithRef<C, TypographyStylesProps>;

type TypographyComponent = <C extends ElementType = 'p'>(props: TypographyProps<C>) => ReactElement | null;

export const Typography: TypographyComponent = forwardRef(
  <C extends ElementType = 'p'>(
    { size = 'md', weight = 'normal', color = 'primary', as, className, children, ...props }: TypographyProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as ?? 'p';
    const classes = mergeClasses(getTypographyClasses({ size, color, weight }), className);

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  },
);
