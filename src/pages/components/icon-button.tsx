import { BUTTON_SIZES, BUTTON_VARIANTS } from '../../components/components.constants';
import { IconButton } from '../../components/icon-button/icon-button';
import { Plus } from '../../generated/icons';

const IconButtonPage = () => (
  <div className="p-8 space-y-6">
    {BUTTON_SIZES.map((size) => (
      <div key={size} className="flex space-x-4">
        {BUTTON_VARIANTS.map((variant) => (
          <IconButton
            key={`${String(size)}-${String(variant)}`}
            size={size}
            variant={variant}
            icon={Plus}
            label="Accessible button label"
          />
        ))}
      </div>
    ))}
  </div>
);

export default IconButtonPage;
