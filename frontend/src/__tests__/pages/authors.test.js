import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AuthorsPage from '../../../pages/authors';
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
  let clickState = false;
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
  let clickState = false;
  return (
    <>
      <div>View Book Page</div>
    </>
  );
});
beforeEach(() => {
  jest.clearAllMocks();
});

describe('authors page tests', () => {
  describe('with empty books result', () => {
    beforeEach(() => {
      useGetBooks.mockReturnValue({
        bookLoading: false,
        bookError: false,
        books: []
      });
    });
    it('should display an empty page with no books found', () => {
      render(
        <BooksProvider>
          <ViewBookProvider>
            <AuthorsPage />
          </ViewBookProvider>
        </BooksProvider>
      );
      const message = screen.getByText(/No Books Found.../i);
      expect(message).toBeInTheDocument();
      debug();
    });
  });

  describe('with books returned', () => {
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
    it('should return book tiles with default styling', () => {
      render(
        <BooksProvider>
          <ViewBookProvider>
            <AuthorsPage />
          </ViewBookProvider>
        </BooksProvider>
      );

      debug();

      const authorName = screen.getByText(/Jim Bob/i);
      expect(authorName).toBeInTheDocument();
      expect(authorName).toHaveStyle(
        'font-weight:400',
        'font-size:2',
        'margin: 0px 0px 0px 20px',
        'background-color:#dfdfdf'
      );

      const bookTitle = screen.getByText(/Hello/i);
      expect(bookTitle).toBeInTheDocument();
      expect(bookTitle.closest('div')).toHaveStyle(
        'font-weight:900',
        'font-size:1',
        'background-color:#bfbfb'
      );

      const bookCard = bookTitle.closest('div').closest('div');
      expect(bookCard).toBeInTheDocument();

      const bookContainer = bookCard.closest('div');
      expect(bookContainer).toBeInTheDocument();
      expect(bookContainer).toHaveStyle(
        'height:unset',
        'background-color:#dfdfdf'
      );

      const pageContainer = authorName.closest('div').closest('div');
      expect(pageContainer).toBeInTheDocument();
      expect(pageContainer).toHaveStyle(
        'background-color:#dfdfdf',
        'flex-wrap:wrap',
        'z-index:0',
        'transform:translateY(125px)'
      );
    });

    it('should respond to the book card click', async () => {
      render(
        <BooksProvider>
          <ViewBookProvider>
            <AuthorsPage />
          </ViewBookProvider>
        </BooksProvider>
      );

      debug();

      const bookCard = screen.getByText(/Hello/i).closest('div').closest('div');
      expect(bookCard).toBeInTheDocument();

      await userEvent.click(bookCard);
      expect(screen.getByText(/MODAL/i)).toBeInTheDocument();
      expect(screen.getByText(/View Book Page/i)).toBeInTheDocument();
    });
  });
});
