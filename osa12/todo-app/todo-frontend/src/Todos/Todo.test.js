import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders text from todo', () => {
  const todo = {
    text: 'Make testing working',
    done: true,
  };

  render(<Todo todo={todo} />);

  const element = screen.getByText('Make testing working');
  expect(element).toBeDefined();
});
