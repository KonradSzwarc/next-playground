import { ElementType, forwardRef, ReactElement } from 'react';

import type { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../types/polymorphic';
import { mergeClasses } from '../../utils/styles';
import { ButtonStylesProps, getButtonClasses } from './button.styles';

export type ButtonProps<C extends ElementType> = PolymorphicComponentPropWithRef<C, ButtonStylesProps>;

type ButtonComponent = <C extends ElementType = 'button'>(props: ButtonProps<C>) => ReactElement | null;

export const Button: ButtonComponent = forwardRef(
  <C extends ElementType = 'button'>(
    { as, size, variant, className, children, ...props }: ButtonProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as ?? 'button';
    const classes = mergeClasses(getButtonClasses({ size, variant }), className);

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  },
);
