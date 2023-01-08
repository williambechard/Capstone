import '@testing-library/jest-dom';
import { act, renderHook, waitFor } from '@testing-library/react';
import {
  useGetCategories,
  useGetCategory,
  useAddCategory,
  getCategory,
  getCategories,
  addCategoryMutation,
  useUpdateCategory,
  updateCategoryMutation
} from '../../../api/categories';
import { MockedProvider } from '@apollo/client/testing';

describe('api Categories test', () => {
  it('should get all categories', async () => {
    const getCategoriesMock = {
      request: {
        query: getCategories,
        variables: {}
      },
      result: {
        data: {
          getCategories: [
            {
              id: '1',
              name: 'Fantasy',
              books: [{ id: '1', title: 'book 1' }]
            },
            {
              id: '2',
              name: 'Fiction',
              books: []
            }
          ]
        }
      }
    };
    const wrapper = ({ children }) => (
      <MockedProvider mocks={[getCategoriesMock]} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useGetCategories(), { wrapper });

    await waitFor(() => expect(result.current.categories.length).not.toBe(0));

    expect(result.current.categoriesError).toBeFalsy();
    expect(result.current.categoriesLoading).toBeFalsy();
  });
  it('should get a category', async () => {
    const getAuthorMOCK = {
      request: {
        query: getCategory,
        variables: { id: '1' }
      },
      result: {
        data: {
          getCategory: {
            id: '1',
            name: 'Fantasy',
            books: [{ id: '1' }]
          }
        }
      }
    };
    const wrapper = ({ children }) => (
      <MockedProvider mocks={[getAuthorMOCK]} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useGetCategory('1'), { wrapper });
    await waitFor(() => expect(result.current.categoryLoading).toBeFalsy());
    expect(JSON.stringify(result.current.category)).toBe(
      JSON.stringify({
        id: '1',
        name: 'Fantasy',
        books: [{ id: '1' }]
      })
    );
  });
  it('should add a category', async () => {
    const addCategoryMock = {
      request: {
        query: addCategoryMutation,
        variables: {
          name: 'Horror'
        }
      },
      result: {
        data: {
          addCategory: {
            id: '2',
            name: 'Horror',
            books: [{ id: '3', title: 'Cooking with cats' }]
          }
        }
      }
    };
    const wrapper = ({ children }) => (
      <MockedProvider mocks={[addCategoryMock]} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAddCategory(), { wrapper });

    await waitFor(() => expect(result.current.addCategoryLoading).toBe(false));

    await act(async () => {
      const authorInfo = await result.current.addCategory('Horror');
      expect(authorInfo.data.addCategory.id).toBe('2');
    });
  });

  it('should update a category', async () => {
    const updateCategoryMock = [
      {
        request: {
          query: updateCategoryMutation,
          variables: { oldId: '1', id: '2', name: '', bookId: '1' }
        },
        result: {
          data: { updateCategory: jest.fn() }
        }
      }
    ];

    const wrapper = ({ children }) => (
      <MockedProvider mocks={updateCategoryMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useUpdateCategory(), { wrapper });
    await waitFor(() =>
      expect(result.current.updateCategoryLoading).toBe(false)
    );
    await act(() => {
      result.current.updateCategory('1', '2', '', '1');
      waitFor(() => expect(result.current.updateCategoryLoading).toBeFalsy());
      expect(result.current.updateCategoryError).toBeFalsy();
    });
  });
});
