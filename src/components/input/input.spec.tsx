import { createRef } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Input } from './input';

describe('Input', () => {
  it('has no a11y issues', async () => {
    const { container } = render(<Input aria-label="My input" />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('can be accessed with ref', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
