import { defineVariants, GetVariantProps } from '@/utils/styles';

export const getInputClasses = defineVariants(
  'block w-full border-gray-300 shadow-sm placeholder-gray-400',
  'focus:border-brand-500 focus:ring-brand-500 focus:shadow-inner',
  'aria-invalid:border-danger-500 aria-invalid:ring-danger-500',
  'disabled:bg-gray-100 disabled:text-gray-500 disabled:placeholder-gray-300 disabled:shadow-none disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        xs: 'rounded h-6 px-2 text-xs',
        sm: 'rounded h-8 px-2.5 text-sm',
        md: 'rounded-md h-10 px-3 text-base',
        lg: 'rounded-md h-12 px-3.5 text-lg',
        xl: 'rounded-lg h-14 px-4 text-xl',
      },
    },
  },
);

export type InputStylesProps = GetVariantProps<typeof getInputClasses>;
