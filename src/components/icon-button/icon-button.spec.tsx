import { createRef, ElementType } from 'react';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Plus } from '@/generated/icons';

import { IconButton, IconButtonProps } from './icon-button';

describe('IconButton', () => {
  let buttonLabel: string;
  let props: IconButtonProps<ElementType>;

  beforeEach(() => {
    buttonLabel = faker.lorem.words();
    props = { icon: Plus, label: buttonLabel };
  });

  it('has no a11y issues', async () => {
    const { container } = render(<IconButton {...props} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('can be accessed with ref', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<IconButton ref={ref} {...props} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders as HTML button element by default', () => {
    render(<IconButton {...props} />);

    const button = screen.getByRole('button', { name: buttonLabel });

    expect(button).toBeInTheDocument();
  });

  it('can render a custom element when provided by an `as` prop', () => {
    const ref = createRef<HTMLAnchorElement>();

    render(<IconButton as="a" ref={ref} {...props} />);

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});
