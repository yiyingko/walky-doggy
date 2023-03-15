// import { render, fireEvent, act } from '@testing-library/react';
// import { useRouter } from 'next/router';
// import AddRecord from '../components/AddRecord';
// import Form from '../src/pages/form/[_id]';

// jest.mock('next/router', () => ({
//   useRouter: jest.fn(),
// }));

// describe('Form', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should render without crashing', () => {
//     (useRouter as jest.Mock).mockReturnValue({ query: { _id: '123' } });

//     const { getByText } = render(<Form />);
//     expect(getByText('Walky Doggy | walk form')).toBeInTheDocument();
//   });

//   it('should render AddRecord component', () => {
//     (useRouter as jest.Mock).mockReturnValue({ query: { _id: '123' } });

//     const { getByTestId } = render(<Form />);
//     expect(getByTestId('add-record')).toBeInTheDocument();
//   });

//   it('should upload image', async () => {
//     const fetchMock = jest.fn();
//     const fetchResponse = {
//       json: jest.fn(() => Promise.resolve({ secure_url: 'http://example.com' })),
//     };
//     const fetchImageMock = jest.fn(() => Promise.resolve(fetchResponse));
//     global.fetch = fetchMock.mockImplementation((url) => {
//       if (url.includes('/locations/123')) {
//         return Promise.resolve({ json: jest.fn(() => Promise.resolve({ coordinates: [0, 0] })) });
//       } else if (url.includes('/images')) {
//         return fetchImageMock();
//       }
//       return Promise.reject(new Error('Invalid URL'));
//     });
//     (useRouter as jest.Mock).mockReturnValue({ query: { _id: '123' } });

//     const { getByLabelText, getByText, getByRole } = render(<Form />);
//     const file = new File(['(⌐□_□)'], 'dog.jpg', { type: 'image/jpeg' });

//     await act(async () => {
//       fireEvent.change(getByLabelText('Upload Photo'), { target: { files: [file] } });
//     });
//     expect(getByRole('img')).toBeInTheDocument();

//     await act(async () => {
//       fireEvent.click(getByText('Upload Files'));
//     });
//     expect(fetchImageMock).toHaveBeenCalled();
//     expect(fetchImageMock.mock.calls[0][1].body.get('image')).toEqual(file);

//     it('should handle form submit', async () => {
//       const mockRecord = {
//         title: 'Test Record',
//         description: 'This is a test record',
//       };
//       const mockAddRecord = jest.fn();
  
//       render(<form onAdd={mockAddRecord} />);
  
//       const titleInput = screen.getByLabelText('Title');
//       const descriptionInput = screen.getByLabelText('Description');
//       const submitButton = screen.getByRole('button', { name: 'Submit' });
  
//       fireEvent.change(titleInput, { target: { value: mockRecord.title } });
//       fireEvent.change(descriptionInput, {
//         target: { value: mockRecord.description },
//       });
//       fireEvent.click(submitButton);
  
//       expect(mockAddRecord).toHaveBeenCalledWith(mockRecord);
//     });
//   });
//   });