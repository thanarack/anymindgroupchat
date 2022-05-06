import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectChannel from '../components/SelectChannel';

test('renders select user component', () => {
  const data = [
    { id: '1', roomName: 'a' },
    { id: '2', roomName: 'b' },
  ];
  const setSelectMock = jest.fn();
  const mockRoomActive = "1"

  render(<SelectChannel data={data} setSelect={setSelectMock} roomActive={mockRoomActive}/>);

  fireEvent.click(screen.getByTestId('channel-id-1'));

  const linkElement = screen.getByText(/2. Choose your Channel/i);

  expect(linkElement).toBeInTheDocument();
  expect(setSelectMock).toBeCalledTimes(1);
  expect(setSelectMock).toBeCalledWith('1');
});
