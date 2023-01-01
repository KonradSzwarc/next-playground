import { ElementType, forwardRef, ReactElement } from 'react';

import type { PolymorphicComponentPropWithRef, PolymorphicRef } from '../../types/polymorphic';
import { mergeClasses } from '../../utils/styles';
import { Icon, SvgIcon } from '../icon/icon';
import { ButtonIconStylesProps, ButtonStylesProps, getButtonClasses, getButtonIconClasses } from './button.styles';

interface ButtonIconProps {
  icon?: SvgIcon;
  iconPosition?: ButtonIconStylesProps['position'];
}

export type ButtonProps<C extends ElementType> = PolymorphicComponentPropWithRef<
  C,
  ButtonStylesProps & ButtonIconProps
>;

type ButtonComponent = <C extends ElementType = 'button'>(props: ButtonProps<C>) => ReactElement | null;

export const Button: ButtonComponent = forwardRef(
  <C extends ElementType = 'button'>(
    {
      size = 'md',
      variant = 'primary',
      icon,
      iconPosition = 'left',
      as,
      className,
      children,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as ?? 'button';
    const classes = mergeClasses(getButtonClasses({ size, variant }), className);
    const iconClasses = icon && getButtonIconClasses({ size, position: iconPosition });

    return (
      <Component ref={ref} className={classes} {...props}>
        {icon && iconPosition === 'left' && <Icon className={iconClasses} icon={icon} />}
        {children}
        {icon && iconPosition === 'right' && <Icon className={iconClasses} icon={icon} />}
      </Component>
    );
  },
);
