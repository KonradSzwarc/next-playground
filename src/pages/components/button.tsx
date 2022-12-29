import type { ElementType } from 'react';

import { Button, ButtonProps } from '../../components/button/button';

const buttonSizes: ButtonProps<ElementType>['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const buttonVariants: ButtonProps<ElementType>['variant'][] = ['primary', 'secondary', 'tertiary', 'danger', 'success'];

const ButtonPage = () => (
  <div className="p-8 space-y-8">
    {buttonSizes.map((size) => (
      <div key={size} className="space-x-4">
        {buttonVariants.map((variant) => (
          <Button key={`${size}-${variant}`} size={size} variant={variant}>
            Button
          </Button>
        ))}
      </div>
    ))}
  </div>
);

export default ButtonPage;
