import { createRef } from 'react';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Plus } from '@/generated/icons';

import { Button } from './button';

describe('Button', () => {
  let buttonText: string;

  beforeEach(() => {
    buttonText = faker.lorem.words();
  });

  it('has no a11y issues', async () => {
    const { container } = render(<Button>{buttonText}</Button>);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('can be accessed with ref', () => {
    const ref = createRef<HTMLButtonElement>();

    render(<Button ref={ref}>{buttonText}</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders as HTML button element by default', () => {
    render(<Button>{buttonText}</Button>);

    const button = screen.getByRole('button', { name: buttonText });

    expect(button).toBeInTheDocument();
  });

  it('can render a custom element when provided by an `as` prop', () => {
    const ref = createRef<HTMLAnchorElement>();

    render(
      <Button as="a" ref={ref}>
        {buttonText}
      </Button>,
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('renders with a left icon when provided', () => {
    render(<Button icon={Plus}>{buttonText}</Button>);

    const button = screen.getByRole('button');

    expect(button.innerHTML).toEndWith(buttonText);
  });

  it('renders with a right icon when provided', () => {
    render(
      <Button icon={Plus} iconPosition="right">
        {buttonText}
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button.innerHTML).toStartWith(buttonText);
  });
});
