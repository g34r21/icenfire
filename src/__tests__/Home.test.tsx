import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import Home from '@/components/Home';

it('Home to render', () => {
  render(<Home />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Home' }),
  ).toBeInTheDocument();
});
