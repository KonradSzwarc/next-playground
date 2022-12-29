import { ElementType, forwardRef, ReactElement } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../types/polymorphic';
import { ButtonStylesProps, getButtonClasses } from './button.styles';

export type ButtonProps<C extends ElementType> = PolymorphicComponentPropWithRef<C, ButtonStylesProps>;

type ButtonComponent = <C extends ElementType = 'button'>(props: ButtonProps<C>) => ReactElement | null;

export const Button: ButtonComponent = forwardRef(
  <C extends ElementType = 'button'>(
    { as, size, variant, className, children, ...props }: ButtonProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as ?? 'button';
    const classes = twMerge(clsx(getButtonClasses({ size, variant }), className));

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  },
);
