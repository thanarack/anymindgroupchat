import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectUser from '../components/SelectUser';

test('renders select user component', () => {
  const data = [
    { id: '1', username: 'a' },
    { id: '2', username: 'b' },
  ];
  const setSelectMock = jest.fn();

  render(<SelectUser data={data} setSelect={setSelectMock} />);

  fireEvent.change(screen.getByTestId('select-users'), {
    target: { value: '2' },
  });

  const linkElement = screen.getByText(/1. Choose your user/i);

  expect(linkElement).toBeInTheDocument();
  expect(setSelectMock).toBeCalledTimes(1);
  expect(setSelectMock).toBeCalledWith('2');
});
