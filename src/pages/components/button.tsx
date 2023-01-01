import type { ElementType } from 'react';

import { Button, ButtonProps } from '../../components/button/button';
import { Plus } from '../../generated/icons';

const buttonSizes: ButtonProps<ElementType>['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const buttonVariants: ButtonProps<ElementType>['variant'][] = ['primary', 'secondary', 'tertiary', 'danger', 'success'];

const ButtonPage = () => (
  <div className="p-8 space-y-16">
    <div className="space-y-6">
      {buttonSizes.map((size) => (
        <div key={size} className="space-x-4">
          {buttonVariants.map((variant) => (
            <Button key={`${String(size)}-${String(variant)}`} size={size} variant={variant}>
              Button
            </Button>
          ))}
        </div>
      ))}
    </div>
    <div className="space-y-6">
      {buttonSizes.map((size) => (
        <div key={size} className="space-x-4">
          {buttonVariants.map((variant) => (
            <Button key={`${String(size)}-${String(variant)}`} size={size} variant={variant} icon={Plus}>
              Button
            </Button>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default ButtonPage;
