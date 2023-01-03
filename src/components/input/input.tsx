import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { mergeClasses } from '@/utils/styles';

import { getInputClasses, InputStylesProps } from './input.styles';

interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'>, InputStylesProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, size = 'md', ...props }, ref) => {
  const classes = mergeClasses(getInputClasses({ size }), className);

  return <input ref={ref} type="text" className={classes} {...props} />;
});
