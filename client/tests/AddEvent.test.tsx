import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddEvent from '../src/components/AddEvent.tsx';

describe('AddEvent component', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    render(<AddEvent onAdd={mockOnAdd} />);
  });

  test('should render the form correctly', () => {
    expect(
      screen.getByRole('heading', { name: 'Book a Walk' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your dog's name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('pick up address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'BOOK' })).toBeInTheDocument();
  });

  test('should add an event when the form is submitted with valid data', () => {
    const titleInput = screen.getByPlaceholderText("your dog's name");
    const datePicker = screen.getByRole('textbox');
    const venueInput = screen.getByPlaceholderText('pick up address');
    const form = screen.getByRole('form');

    fireEvent.change(titleInput, { target: { value: 'Buddy' } });
    fireEvent.change(datePicker, { target: { value: '04/13/2023 2:30 PM' } });
    fireEvent.change(venueInput, { target: { value: '123 Main St' } });
    fireEvent.submit(form);

    expect(mockOnAdd).toHaveBeenCalledWith({
      title: 'Buddy',
      date: new Date(2023, 3, 13, 14, 30),
      venue: '123 Main St',
    });
    expect(titleInput).toHaveValue('');
    expect(datePicker).toHaveValue('');
    expect(venueInput).toHaveValue('');
  });

  test('should not add an event when the form is submitted with invalid data', () => {
    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
