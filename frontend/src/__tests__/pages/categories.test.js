import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CategoriesPage from '../../../pages/categories';
import { useGetCategories } from '../../../api/categories';
import userEvent from '@testing-library/user-event';

import { debug } from 'jest-preview';
import { CategoriesProvider } from '../../../providers';

jest.mock('../../../api/categories');
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

jest.mock('../../../components/Table/Table', () => ({ columns, data }) => {
  return (
    <table>
      <thead key={'1'}>
        <tr key={'2'}>
          <th key={'3'}>{columns[0].Header}</th>
          <th key={'4'}>{columns[1].Header}</th>
        </tr>
      </thead>
      <tbody key={'5'}>
        {data.map(cat => {
          return (
            <tr key={'6'}>
              <td key={'7'}>{cat.name}</td>
              <td key={'8'}>{cat.books.length}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
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
          <CategoriesPage />
        </CategoriesProvider>
      );
      const message = screen.getByText(/Categories Loading.../i);
      expect(message).toBeInTheDocument();
      debug();
    });
    it('should display a table with the categories', () => {
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
          <CategoriesPage />
        </CategoriesProvider>
      );
      debug();
      const message = screen.getByText(/Categories/i);
      expect(message).toBeInTheDocument();
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.getByText(/Fantasy/i)).toBeInTheDocument();
      expect(screen.getByText(/1/i)).toBeInTheDocument();
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
          <CategoriesPage />
        </CategoriesProvider>
      );
      debug();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
    it('should respond to add category button click', async () => {
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
          <CategoriesPage />
        </CategoriesProvider>
      );
      debug();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      await userEvent.click(button);
      expect(screen.getByText(/Add Category Form/)).toBeInTheDocument();
    });
  });
});
