import { ChangeEvent, useState } from 'react';

import { BUTTON_SIZES } from '@/components/constants';
import { Input } from '@/components/input';

const InputPage = () => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const props = { value, onChange: handleChange, placeholder: 'Placeholder', className: 'w-60' };

  return (
    <div className="p-8">
      <div className="space-y-6">
        {BUTTON_SIZES.map((size) => (
          <div key={size} className="flex space-x-4">
            <Input {...props} size={size} />
            <Input {...props} size={size} aria-invalid />
            <Input {...props} size={size} disabled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputPage;
