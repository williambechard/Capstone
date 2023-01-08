import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ViewBookPage } from '../../../components';
import {
  useAddBook,
  useGetBook,
  useGetBooks,
  useUpdateBook
} from '../../../api/books';
import {
  useAddAuthor,
  useGetAuthors,
  useUpdateAuthor
} from '../../../api/authors';
import { useGetCategories, useUpdateCategory } from '../../../api/categories';
import userEvent from '@testing-library/user-event';
import ReactDOM from 'react-dom';
import {
  AuthorsProvider,
  BooksProvider,
  CategoriesProvider
} from '../../../providers';
import { debug } from 'jest-preview';

jest.mock('../../../api/books');
jest.mock('../../../api/categories');
jest.mock('../../../api/authors');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Book Info Page Component Tests', () => {
  beforeEach(() => {
    useGetBook.mockReturnValue({
      bookLoading: false,
      bookError: false,
      book: {
        title: 'Hello',
        author: {
          firstName: 'Jim',
          lastName: 'Bob'
        },
        description: 'Hello Worlds'
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a default ViewBookPage component with text Loading... as long as bookLoading=true and bookError=false', () => {
    useGetBook.mockReturnValue({
      bookLoading: true,
      bookError: false
    });
    render(<ViewBookPage />);
    const viewBookPage = screen.getByText('Loading...');
    expect(viewBookPage).toBeInTheDocument();
  });
  it('should render a default ViewBookPage component with text Loading... as long as bookLoading=false and bookError=true', () => {
    useGetBook.mockReturnValue({
      bookLoading: false,
      bookError: true
    });
    render(<ViewBookPage />);
    const viewBookPage = screen.getByText('Loading...');
    expect(viewBookPage).toBeInTheDocument();
  });
  it('should render a default ViewBookPage component with text Loading... as long as bookLoading=true and bookError=true', () => {
    useGetBook.mockReturnValue({
      bookLoading: true,
      bookError: true
    });
    render(<ViewBookPage />);
    const viewBookPage = screen.getByText('Loading...');
    expect(viewBookPage).toBeInTheDocument();
  });
  it('should respond to a click on the My Library breadcrumb', async () => {
    const mockCallBack = jest.fn();
    render(<ViewBookPage returnPath={'My Library'} onClick={mockCallBack()} />);

    const bookLink = screen.getByText('My Library');
    expect(bookLink).toBeInTheDocument();
    await waitFor(() => {
      expect(bookLink).toBeInTheDocument();
      userEvent.click(bookLink);
      expect(mockCallBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('when modal is used', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      useGetBook.mockReturnValue({
        bookLoading: false,
        bookError: false,
        book: {
          id: '1',
          title: 'Hello',
          description: 'Hello World',
          author: {
            firstName: 'Jim',
            lastName: 'Bob'
          }
        }
      });

      useGetBooks.mockReturnValue({
        booksLoading: false,
        booksError: false,
        books: [
          {
            id: '1',
            title: 'Hello',
            description: 'Hello World',
            author: {
              firstName: 'Jim',
              lastName: 'Bob'
            }
          }
        ]
      });

      useGetCategories.mockReturnValue({
        categoriesLoading: false,
        categoriesError: false,
        categories: [
          {
            id: '1',
            name: 'Fantasy',
            books: ['1']
          }
        ]
      });

      useUpdateCategory.mockReturnValue({
        updateCategoryLoading: false,
        updateCategoryError: false,
        updateCategory: (oldId, id, name, bookId) => jest.fn()
      });

      useUpdateBook.mockReturnValue({
        updateBook: (id, title, authorId, categoryId, description) => jest.fn(),
        updateBookLoading: false,
        updateBookError: false
      });

      useAddBook.mockReturnValue({
        addBook: jest.fn()
      });

      useGetAuthors.mockReturnValue({
        authorsLoading: false,
        authorsError: false,
        author: {
          id: '1',
          firstName: 'Jim',
          lastName: 'Bob'
        }
      });

      useAddAuthor.mockReturnValue({
        addAuthorLoading: false,
        addAuthorError: false,
        addAuthor: () => {}
      });

      useUpdateAuthor.mockReturnValue({
        updateAuthor: (id, firstName, lastName, bookToAdd) => jest.fn(),
        updateAuthorLoading: false,
        updateAuthorError: false
      });

      render(<div id="ModalArea" />);
    });

    it('should respond to edit button click', async () => {
      const user = userEvent.setup();
      render(
        <BooksProvider>
          <CategoriesProvider>
            <AuthorsProvider>
              <ViewBookPage />
            </AuthorsProvider>
          </CategoriesProvider>
        </BooksProvider>
      );

      const editButton = screen.getByRole('button', { name: 'Edit' });
      expect(editButton).toBeInTheDocument();
      await user.click(editButton);

      expect(screen.getByText(/Edit Book/i)).toBeInTheDocument();
    });
    it('should respond to edit modal click on X ', async () => {
      const user = userEvent.setup();
      render(
        <BooksProvider>
          <CategoriesProvider>
            <AuthorsProvider>
              <ViewBookPage />
            </AuthorsProvider>
          </CategoriesProvider>
        </BooksProvider>
      );

      const editButton = screen.getByRole('button', { name: 'Edit' });
      expect(editButton).toBeInTheDocument();

      await user.click(editButton);
      const xButton = screen.getByRole('button', { name: 'closeModal' });
      expect(xButton).toBeInTheDocument();
      await user.click(xButton);
      expect(xButton).not.toBeInTheDocument();
    });
    it('should respond to the Cancel button clicked on the Add Book Form', async () => {
      const user = userEvent.setup();
      render(
        <BooksProvider>
          <CategoriesProvider>
            <AuthorsProvider>
              <ViewBookPage />
            </AuthorsProvider>
          </CategoriesProvider>
        </BooksProvider>
      );

      const editButton = screen.getByRole('button', { name: 'Edit' });

      expect(editButton).toBeInTheDocument();

      await userEvent.click(editButton);

      const btn = screen.getByRole('button', {
        name: 'submitAddBookForm'
      });
      expect(btn).toBeInTheDocument();
      const cancelButton = screen.getByRole('button', {
        name: 'closeAddBookForm'
      });

      expect(cancelButton).toBeInTheDocument();
      await userEvent.click(cancelButton);

      expect(cancelButton).not.toBeInTheDocument();
    });
  });
});
