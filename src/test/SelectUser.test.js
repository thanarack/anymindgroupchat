import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectUser from '../components/SelectUser';
import { IUsers } from '../context/AppContext';

test('renders learn react link', () => {
  const data = [];
  const setSelectMock = jest.fn();
  // const setStateMock = jest.fn();
  // const useStateMock: any = (useState: any) => [useState, setStateMock];
  // jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  render(<SelectUser data={data} setSelect={setSelectMock} />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
