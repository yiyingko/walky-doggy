import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Navbar from '../components/Navbar';

afterEach(cleanup);

describe('Navbar', () => {
  it('renders the logo', () => {
    const { getByAltText } = render(<Navbar />);
    expect(getByAltText('man-with-dog')).toBeInTheDocument();
  });

  it('renders the home link', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText('Home')).toBeInTheDocument();
  });

  it('renders the my account link', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText('My Account')).toBeInTheDocument();
  });

  it('renders the walker link', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText('Walker')).toBeInTheDocument();
  });
});