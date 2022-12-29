import type { ElementType } from 'react';

import { Typography, TypographyProps } from '../../components/typography/typography';

const typographySizes: TypographyProps<ElementType>['size'][] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
];

const TypographyPage = () => (
  <div className="p-8 space-y-8">
    <div>
      <p>Colors:</p>
      <Typography color="title">Title text</Typography>
      <Typography color="primary">Primary text</Typography>
      <Typography color="secondary">Secondary text</Typography>
    </div>
    <div>
      <p>Weights:</p>
      <Typography weight="normal">Normal text</Typography>
      <Typography weight="bold">Bold text</Typography>
      <Typography weight="black">Black text</Typography>
    </div>
    <div>
      <p>Sizes:</p>
      <div className="space-y-2">
        {typographySizes.map((size) => (
          <Typography key={size} size={size}>
            {size} text
          </Typography>
        ))}
      </div>
    </div>
  </div>
);

export default TypographyPage;
