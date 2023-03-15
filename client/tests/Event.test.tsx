import { render, screen, fireEvent } from '@testing-library/react';
import moment from 'moment';
import Event from '../src/components/Event';

const testEvent = {
  _id: '123',
  title: 'Test Event',
  date: '2023-04-01T12:00:00.000Z',
  venue: 'Test Venue',
};

describe('Event', () => {
  it('should render event data correctly', () => {
    render(<Event event={testEvent} onDelete={() => {}} formPath='/' />);
    const titleElement = screen.getByText('Test Event');
    const dateElement = screen.getByText('12:00 pm - April  1st, 2023');
    const venueElement = screen.getByText('Test Venue');
    expect(titleElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(venueElement).toBeInTheDocument();
  });

  it('should call onDelete function when delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    render(<Event event={testEvent} onDelete={mockOnDelete} formPath='/' />);
    const deleteButton = screen.getByRole('button', { name: 'delete' });
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith('123');
  });

  it('should render correct link when formPath prop is provided', () => {
    render(<Event event={testEvent} onDelete={() => {}} formPath='/forms/' />);
    const linkElement = screen.getByRole('link', { name: 'click' });
    expect(linkElement).toHaveAttribute('href', '/forms/123');
  });

  it('should render correct date format', () => {
    render(<Event event={testEvent} onDelete={() => {}} formPath='/' />);
    const dateElement = screen.getByText('12:00 pm - April  1st, 2023');
    expect(dateElement).toBeInTheDocument();
  });
});
