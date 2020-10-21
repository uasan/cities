import React from 'react';
import { render } from '@testing-library/react';
import SearchCity from './searchCity';

test('renders without crashing', () => {
  const { getByText } = render(<SearchCity />);
  const linkElement = getByText(/City:/i);
  expect(linkElement).toBeInTheDocument();
});
