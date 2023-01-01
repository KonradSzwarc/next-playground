import { BUTTON_ICON_SIZE_STYLES, BUTTON_VARIANT_STYLES, FOCUS_CLASSES } from '@/components/constants';
import { defineVariants, GetVariantProps } from '@/utils/styles';

export const getIconButtonClasses = defineVariants(
  'flex items-center justify-center',
  FOCUS_CLASSES,
  'active:translate-y-px',
  {
    variants: {
      size: {
        xs: 'rounded w-6 h-6',
        sm: 'rounded w-8 h-8',
        md: 'rounded-md w-10 h-10',
        lg: 'rounded-md w-12 h-12',
        xl: 'rounded-lg w-14 h-14',
      },
      variant: BUTTON_VARIANT_STYLES,
    },
  },
);

export type IconButtonStylesProps = GetVariantProps<typeof getIconButtonClasses>;

export const getIconButtonIconClasses = defineVariants({
  variants: {
    size: BUTTON_ICON_SIZE_STYLES,
  },
});

export type IconButtonIconStylesProps = GetVariantProps<typeof getIconButtonIconClasses>;
