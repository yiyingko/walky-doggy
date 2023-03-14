import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import AddRecord from '../components/AddRecord';

afterEach(cleanup);

describe('AddRecord', () => {
  it('renders the form with PEE and POO checkboxes', () => {
    const { getByLabelText, getByText } = render(<AddRecord onAdd={() => {}} eventId="testEventId" />);
    expect(getByText('POO/PEE RECORD')).toBeInTheDocument();
    expect(getByLabelText('PEE')).toBeInTheDocument();
    expect(getByLabelText('POO')).toBeInTheDocument();
  });

  it('calls the onAdd function with correct data when form is submitted', () => {
    const onAddMock = jest.fn();
    const { getByLabelText, getByText } = render(<AddRecord onAdd={onAddMock} eventId="testEventId" />);
    const peeCheckbox = getByLabelText('PEE');
    const pooCheckbox = getByLabelText('POO');
    const submitButton = getByText('Submit');

    fireEvent.click(peeCheckbox);
    fireEvent.click(pooCheckbox);
    fireEvent.click(submitButton);

    expect(onAddMock).toHaveBeenCalledWith({ eventId: 'testEventId', pee: true, poo: true });
  });
});
