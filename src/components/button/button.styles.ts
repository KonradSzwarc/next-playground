import { defineVariants, GetVariantProps } from '../../utils/styles';
import { BUTTON_ICON_SIZE_STYLES, BUTTON_VARIANT_STYLES, FOCUS_CLASSES } from '../components.constants';

export const getButtonClasses = defineVariants(
  'flex items-center font-medium',
  FOCUS_CLASSES,
  'active:translate-y-px',
  {
    variants: {
      size: {
        xs: 'rounded h-6 px-3 text-xs',
        sm: 'rounded h-8 px-4 text-sm',
        md: 'rounded-md h-10 px-5 text-base',
        lg: 'rounded-md h-12 px-6 text-lg',
        xl: 'rounded-lg h-14 px-7 text-xl',
      },
      variant: BUTTON_VARIANT_STYLES,
    },
  },
);

export type ButtonStylesProps = GetVariantProps<typeof getButtonClasses>;

export const getButtonIconClasses = defineVariants({
  variants: {
    size: BUTTON_ICON_SIZE_STYLES,
    position: { left: '', right: '' },
  },
  compoundVariants: [
    { size: 'xs', position: 'left', className: 'mr-1 -ml-0.5' },
    { size: 'xs', position: 'right', className: 'ml-1 -mr-0.5' },
    { size: 'sm', position: 'left', className: 'mr-1.5 -ml-1' },
    { size: 'sm', position: 'right', className: 'ml-1.5 -mr-1' },
    { size: 'md', position: 'left', className: 'mr-1.5 -ml-1' },
    { size: 'md', position: 'right', className: 'ml-1.5 -mr-1' },
    { size: 'lg', position: 'left', className: 'mr-2 -ml-1.5' },
    { size: 'lg', position: 'right', className: 'ml-2 -mr-1.5' },
    { size: 'xl', position: 'left', className: 'mr-2.5 -ml-2' },
    { size: 'xl', position: 'right', className: 'ml-2.5 -mr-2' },
  ],
});

export type ButtonIconStylesProps = GetVariantProps<typeof getButtonIconClasses>;
