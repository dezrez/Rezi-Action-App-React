import React from 'react';
import { render, screen } from '@testing-library/react';
import ReziActionAppWrapper from './ReziActionAppWrapper';

test('renders learn react link', () => {
  render(<ReziActionAppWrapper />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
