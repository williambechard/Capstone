import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import AuthorsPage from '../../../pages/authors';
import { useGetBooks } from '../../../api/books';
import userEvent from '@testing-library/user-event';
import {
  AuthorsProvider,
  BooksProvider,
  ViewBookProvider
} from '../../../providers';
import { debug } from 'jest-preview';
import { useGetAuthors } from '../../../api/authors';

jest.mock('../../../api/books');
jest.mock('../../../api/authors');

jest.mock('next/image', () => ({ src, alt, width, height }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    // eslint-disable-next-line
    <img src={src} alt={alt} style={{ width: width, height: height }} />
  );
});

jest.mock(
  '../../../components/Modal/Modal',
  () =>
    ({ children, title, onClick }) => {
      return (
        <div>
          <button onClick={() => onClick}>X</button>
          <div>MODAL {title}</div>
          {children}
        </div>
      );
    }
);
jest.mock('../../../components/AddBookForm/AddBookForm', () => () => {
  return <div>Add Book Form</div>;
});
jest.mock(
  '../../../components/ViewBookPAge/ViewBookPage',
  () =>
    ({ bookId, returnPath, onClick }) => {
      return (
        <>
          <button onClick={() => onClick}>Cancel</button>
          <div>{returnPath}</div>
          <div>bookId:{bookId}</div>
          <div>View Book Page</div>
        </>
      );
    }
);
beforeEach(() => {
  jest.clearAllMocks();
});

describe('authors page tests', () => {
  describe('with empty authors result', () => {
    beforeEach(() => {
      useGetAuthors.mockReturnValue({
        authorsLoading: false,
        authorsError: false,
        authors: []
      });
      useGetBooks.mockReturnValue({
        bookLoading: false,
        bookError: false,
        books: []
      });
    });
    it('should display an empty page with no authors found', () => {
      render(
        <BooksProvider>
          <AuthorsProvider>
            <ViewBookProvider>
              <AuthorsPage />
            </ViewBookProvider>
          </AuthorsProvider>
        </BooksProvider>
      );
      const message = screen.getByText(/No Authors Found.../i);
      expect(message).toBeInTheDocument();
      debug();
    });
  });

  describe('with authors returned', () => {
    beforeEach(() => {
      useGetAuthors.mockReturnValue({
        authorsLoading: false,
        authorsError: false,
        authors: [
          {
            id: '1',
            firstName: 'Jim',
            lastName: 'Bob',
            books: [
              {
                id: '1',
                title: 'Hello World'
              }
            ]
          }
        ]
      });
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
          <AuthorsProvider>
            <ViewBookProvider>
              <AuthorsPage />
            </ViewBookProvider>
          </AuthorsProvider>
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

    it('should respond to the book card modal X click', async () => {
      render(
        <BooksProvider>
          <AuthorsProvider>
            <ViewBookProvider>
              <AuthorsPage />
            </ViewBookProvider>
          </AuthorsProvider>
        </BooksProvider>
      );

      debug();

      const bookCard = screen.getByText(/Hello/i).closest('div').closest('div');
      expect(bookCard).toBeInTheDocument();

      await userEvent.click(bookCard);
      expect(screen.getByText(/MODAL/i)).toBeInTheDocument();
      expect(screen.getByText(/Book Info/i)).toBeInTheDocument();
      expect(screen.getByText(/View Book Page/i)).toBeInTheDocument();
      const xButton = screen.getByRole('button', { name: 'X' });
      expect(xButton).toBeInTheDocument();

      await userEvent.click(xButton);

      waitFor(() => expect(screen.getByText(/MODAL/i)).not.toBeInTheDocument());
    });

    it('should respond to the View Book Page Cancel Button click', async () => {
      render(
        <BooksProvider>
          <AuthorsProvider>
            <ViewBookProvider>
              <AuthorsPage />
            </ViewBookProvider>
          </AuthorsProvider>
        </BooksProvider>
      );

      debug();

      const bookCard = screen.getByText(/Hello/i).closest('div').closest('div');
      expect(bookCard).toBeInTheDocument();

      await userEvent.click(bookCard);
      expect(screen.getByText(/MODAL/i)).toBeInTheDocument();
      expect(screen.getByText(/Book Info/i)).toBeInTheDocument();
      expect(screen.getByText(/View Book Page/i)).toBeInTheDocument();
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      expect(cancelButton).toBeInTheDocument();

      expect(screen.getByText(/Authors/i)).toBeInTheDocument();
      expect(screen.getByText(/bookId:1/i)).toBeInTheDocument();
      await userEvent.click(cancelButton);

      waitFor(() => expect(screen.getByText(/MODAL/i)).not.toBeInTheDocument());
    });
  });
});
