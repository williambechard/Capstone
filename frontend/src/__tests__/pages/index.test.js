import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../../pages';
import { useGetBooks } from '../../../api/books';
import userEvent from '@testing-library/user-event';
import { BooksProvider, ViewBookProvider } from '../../../providers';
import { debug } from 'jest-preview';

jest.mock('../../../api/books');
jest.mock('../../../api/authors');

jest.mock('next/image', () => ({ src, alt, width, height }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    // eslint-disable-next-line
    <img src={src} alt={alt} style={{ width: width, height: height }} />
  );
});

jest.mock('../../../components/Modal/Modal', () => ({ children }) => {
  return (
    <>
      <div>MODAL</div>
      {children}
    </>
  );
});
jest.mock('../../../components/AddBookForm/AddBookForm', () => () => {
  return <div>Add Book Form</div>;
});
jest.mock('../../../components/ViewBookPAge/ViewBookPage', () => () => {
  return <div>View Book Page</div>;
});
beforeEach(() => {
  jest.clearAllMocks();
});
describe('test of the main index home page', () => {
  beforeEach(() => {
    useGetBooks.mockReturnValue({
      bookLoading: false,
      bookError: false,
      books: []
    });
  });
  describe('if books are empty', () => {
    it('should display the default page', () => {
      useGetBooks.mockReturnValue({
        bookLoading: false,
        bookError: false,
        books: []
      });
      render(
        <BooksProvider>
          <ViewBookProvider>
            <Home />
          </ViewBookProvider>
        </BooksProvider>
      );

      debug();
      const textElement = screen.getByText(/My Library/i);
      expect(textElement).toBeInTheDocument();
      expect(textElement).toHaveStyle(
        'background-color:#dfdfdf',
        'font-size:1.5',
        'margin:auto 20px'
      );
      expect(textElement.closest('div')).toHaveStyle(
        'background-color:#dfdfdf',
        'justify-content:space-between',
        'z-index:2'
      );
      expect(textElement.closest('div').closest('div')).toHaveStyle(
        'background-color:#dfdfdf',
        'justify-content:space-between',
        'z-index:2',
        'transform:translateY(80px)'
      );

      const addBookButton = screen.getByRole('button');
      expect(addBookButton).toBeInTheDocument();
      expect(addBookButton).toHaveStyle('margin:auto 10px');

      const noBooksFoundText = screen.getByText(/No Books Found.../i);
      expect(noBooksFoundText).toBeInTheDocument();
    });
  });
  describe('if books have data', () => {
    beforeEach(() => {
      useGetBooks.mockReturnValue({
        bookLoading: false,
        bookError: false,
        books: [
          {
            id: '1',
            title: 'Hello',
            author: {
              firstName: 'Jim',
              lastName: 'Bob'
            },
            description: 'Hello World'
          }
        ]
      });
    });

    it('should show book a book Card for each book loaded (1x)', () => {
      render(
        <BooksProvider>
          <ViewBookProvider>
            <Home />
          </ViewBookProvider>
        </BooksProvider>
      );
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
    it('should open Add Book Form when + book button clicked', async () => {
      render(
        <BooksProvider>
          <ViewBookProvider>
            <Home />
          </ViewBookProvider>
        </BooksProvider>
      );

      const addBookButton = screen.getByRole('button', {
        label: '+ Add Book'
      });
      expect(addBookButton).toBeInTheDocument();
      await userEvent.click(addBookButton);
      expect(screen.getByText(/MODAL/i)).toBeInTheDocument();
      expect(screen.getByText(/Add Book Form/i)).toBeInTheDocument();
    });
    it('should open View Book Form when a book card is clicked', async () => {
      render(
        <BooksProvider>
          <ViewBookProvider>
            <Home />
          </ViewBookProvider>
        </BooksProvider>
      );

      const bookCard = screen.getByText('Hello');
      expect(bookCard).toBeInTheDocument();
      await userEvent.click(bookCard);
      expect(screen.getByText(/MODAL/i)).toBeInTheDocument();
      expect(screen.getByText(/View Book Page/i)).toBeInTheDocument();
    });
  });
});
