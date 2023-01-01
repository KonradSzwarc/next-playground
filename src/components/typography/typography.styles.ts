import { defineVariants, GetVariantProps } from '@/utils/styles';

export const getTypographyClasses = defineVariants({
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-semibold',
      black: 'font-extrabold',
    },
    color: {
      title: 'text-gray-900',
      primary: 'text-gray-700',
      secondary: 'text-gray-500',
    },
  },
});

export type TypographyStylesProps = GetVariantProps<typeof getTypographyClasses>;
