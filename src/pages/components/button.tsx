import { Button } from '@/components/button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from '@/components/constants';
import { Plus } from '@/generated/icons';

const ButtonPage = () => (
  <div className="p-8 space-y-16">
    <div className="space-y-6">
      {BUTTON_SIZES.map((size) => (
        <div key={size} className="flex space-x-4">
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={`${String(size)}-${String(variant)}`} size={size} variant={variant}>
              Button
            </Button>
          ))}
        </div>
      ))}
    </div>
    <div className="space-y-6">
      {BUTTON_SIZES.map((size) => (
        <div key={size} className="flex space-x-4">
          {BUTTON_VARIANTS.map((variant) => (
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
