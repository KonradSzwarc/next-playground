import { defineVariants, GetVariantProps } from '../../utils/styles';

export const getButtonClasses = defineVariants(
  'inline-flex items-center font-medium',
  'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
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
      variant: {
        primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
        secondary: 'border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-100',
        tertiary: 'text-gray-700 hover:bg-gray-100',
        danger: 'bg-danger-600 text-white shadow-sm hover:bg-danger-700',
        success: 'bg-success-600 text-white shadow-sm hover:bg-success-700',
      },
    },
  },
);

export type ButtonStylesProps = GetVariantProps<typeof getButtonClasses>;

export const getButtonIconClasses = defineVariants({
  variants: {
    size: { xs: 'w-3 h-3', sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-4.5 h-4.5', xl: 'w-5 h-5' },
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
