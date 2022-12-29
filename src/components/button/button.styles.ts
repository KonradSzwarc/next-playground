import { classed, VariantProps } from '@tw-classed/core';

export const getButtonClasses = classed(
  'inline-flex items-center font-medium',
  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  'active:translate-y-px',
  {
    variants: {
      size: {
        xs: 'rounded h-6 px-3 text-xs',
        sm: 'rounded h-8 px-4 text-sm',
        md: 'rounded-md h-10 px-5 text-md',
        lg: 'rounded-md h-12 px-6 text-lg',
        xl: 'rounded-lg h-14 px-7 text-xl',
      },
      variant: {
        primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700',
        secondary: 'border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-100',
        tertiary: 'text-gray-700 hover:bg-gray-100',
        danger: 'bg-danger-600 text-white shadow-sm hover:bg-danger-700',
        success: 'bg-success-600 text-white shadow-sm hover:bg-success-700',
      },
    },
  },
);

export type ButtonStylesProps = Required<VariantProps<typeof getButtonClasses>>;
