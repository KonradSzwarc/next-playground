type ButtonSize = typeof BUTTON_SIZES[number];

type ButtonVariant = typeof BUTTON_VARIANTS[number];

export const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary', 'danger', 'success'] as const;

export const BUTTON_ICON_SIZE_STYLES = /* tw */ {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-4.5 h-4.5',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
} satisfies Record<ButtonSize, string>;

export const BUTTON_VARIANT_STYLES = /* tw */ {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
  secondary: 'border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-100',
  tertiary: 'text-gray-700 hover:bg-gray-100',
  danger: 'bg-danger-600 text-white shadow-sm hover:bg-danger-700',
  success: 'bg-success-600 text-white shadow-sm hover:bg-success-700',
} satisfies Record<ButtonVariant, string>;

export const FOCUS_CLASSES = /* tw */ 'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2';
