import { ElementType, forwardRef, ReactElement } from 'react';

import { Icon, SvgIcon } from '@/components/icon';
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from '@/types/polymorphic';
import { mergeClasses } from '@/utils/styles';

import { getIconButtonClasses, getIconButtonIconClasses, IconButtonStylesProps } from './icon-button.styles';

interface IconButtonCustomProps {
  icon: SvgIcon;
  label: string;
  children?: never;
}

export type IconButtonProps<C extends ElementType> = PolymorphicComponentPropWithRef<
  C,
  IconButtonStylesProps & IconButtonCustomProps
>;

type IconButtonComponent = <C extends ElementType = 'button'>(props: IconButtonProps<C>) => ReactElement | null;

export const IconButton: IconButtonComponent = forwardRef(
  <C extends ElementType = 'button'>(
    { size = 'md', variant = 'primary', icon, label, as, className, ...props }: IconButtonProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as ?? 'button';
    const classes = mergeClasses(getIconButtonClasses({ size, variant }), className);
    const iconClasses = getIconButtonIconClasses({ size });

    return (
      <Component ref={ref} className={classes} aria-label={label} {...props}>
        <Icon className={iconClasses} icon={icon} aria-hidden />
      </Component>
    );
  },
);
