import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const mergeClasses = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));

export type { VariantProps as GetVariantProps } from '@tw-classed/core';

// When changing this function name also update tailwindCSS.experimental.classRegex property in .vscode/settings.json.
export { classed as defineVariants } from '@tw-classed/core';
