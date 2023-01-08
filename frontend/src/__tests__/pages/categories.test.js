import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CategoriesPage from '../../../pages/categories';
import { useGetCategories } from '../../../api/categories';
import userEvent from '@testing-library/user-event';
import ViewBooksProvider from '../../../providers/ViewBookProvider/ViewBookProvider';
import { debug } from 'jest-preview';
import { CategoriesProvider } from '../../../providers';
import { Table } from '../../../components';

jest.mock('../../../api/categories');
jest.mock('../../../api/books');
jest.mock('../../../components/Modal/Modal', () => ({ children }) => {
  return (
    <>
      <div>MODAL</div>
      {children}
    </>
  );
});

jest.mock('../../../components/AddCategoryForm/AddCategoryForm', () => () => {
  return <div>Add Category Form</div>;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('categories page tests', () => {
  describe('with categories loading', () => {
    it('should display an empty page with no books found', () => {
      useGetCategories.mockReturnValue({
        categoriesLoading: true,
        categoriesError: false,
        categories: []
      });
      render(
        <CategoriesProvider>
          <ViewBooksProvider>
            <CategoriesPage />
          </ViewBooksProvider>
        </CategoriesProvider>
      );
      const message = screen.getByText(/Categories Loading.../i);
      expect(message).toBeInTheDocument();
      debug();
    });
  });
  describe('with categories', () => {
    it('should display a table with the categories', () => {
      useGetCategories.mockReturnValue({
        categoriesLoading: false,
        categoriesError: false,
        categories: [
          {
            id: 1,
            name: 'Fantasy',
            books: [
              {
                id: '1',
                title: 'Harry Potter',
                author: {
                  id: '1',
                  firstName: 'JK',
                  lastName: 'Rowling'
                },
                description: 'wizards'
              }
            ]
          }
        ]
      });
      render(
        <CategoriesProvider>
          <ViewBooksProvider>
            <CategoriesPage />
          </ViewBooksProvider>
        </CategoriesProvider>
      );
      debug();
      const message = screen.getByText(/Categories/i);
      expect(message).toBeInTheDocument();
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.getByText(/Fantasy/i)).toBeInTheDocument();
      const allCells = screen.getByRole('cell', { name: '1' });
      expect(allCells).toBeInTheDocument();
    });
    it('should display an add category button', () => {
      useGetCategories.mockReturnValue({
        categoriesLoading: false,
        categoriesError: false,
        categories: [
          {
            books: ['1'],
            id: 1,
            name: 'Fantasy'
          }
        ]
      });
      render(
        <CategoriesProvider>
          <ViewBooksProvider>
            <CategoriesPage />
          </ViewBooksProvider>
        </CategoriesProvider>
      );
      debug();
      const button = screen.getByRole('button', { name: 'Add Category' });
      expect(button).toBeInTheDocument();
    });
    it('should respond to add category button click', async () => {
      const user = userEvent.setup();
      useGetCategories.mockReturnValue({
        categoriesLoading: false,
        categoriesError: false,
        categories: [
          {
            books: ['1'],
            id: 1,
            name: 'Fantasy'
          }
        ]
      });

      render(
        <CategoriesProvider>
          <ViewBooksProvider>
            <CategoriesPage />
          </ViewBooksProvider>
        </CategoriesProvider>
      );
      debug();
      const button = screen.getByRole('button', { name: 'Add Category' });
      expect(button).toBeInTheDocument();
      await user.click(button);
      expect(screen.getByText(/Add Category Form/)).toBeInTheDocument();
    });
    it('should show category details when a category title is clicked on the table ', async () => {
      const user = userEvent.setup();

      useGetCategories.mockReturnValue({
        categoriesLoading: false,
        categoriesError: false,
        categories: [
          {
            id: 1,
            name: 'Fantasy',
            books: [
              {
                id: '1',
                title: 'Harry Potter',
                description: 'wizards',
                author: {
                  id: '1',
                  firstName: 'JK',
                  lastName: 'Rowling'
                }
              }
            ]
          }
        ]
      });

      render(
        <CategoriesProvider>
          <ViewBooksProvider>
            <CategoriesPage />
          </ViewBooksProvider>
        </CategoriesProvider>
      );

      debug();

      const categoryTitle = screen.getByText(/Fantasy/i);
      expect(categoryTitle).toBeInTheDocument();

      await user.click(categoryTitle);

      expect(screen.getByText(/Harry Potter/i)).toBeInTheDocument();
      expect(screen.getByText(/JK Rowling/i)).toBeInTheDocument();
      expect(screen.getByText(/wizards/i)).toBeInTheDocument();
    });
  });
});
