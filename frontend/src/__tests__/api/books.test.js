import '@testing-library/jest-dom';
import { act, renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import {
  allBooksQuery,
  aBookQuery,
  addBookMutation,
  removeBookMutation,
  useGetBooks,
  useGetBook,
  useAddBook,
  useRemoveBook,
  useUpdateBook,
  updateBookMutation
} from '../../../api/books';

describe('books api test', () => {
  it('should get all books', async () => {
    const getBooksMOCK = {
      request: {
        query: allBooksQuery,
        variables: {}
      },
      result: {
        data: {
          getBooks: [
            {
              id: '1',
              title: 'Harry Potter and the Chamber of Secrets',
              coverImage: '',
              author: {
                id: '1',
                firstName: 'J.K.',
                lastName: 'Rowling'
              },
              category: '1',
              description: 'hello world'
            },
            {
              id: '2',
              title: 'Harry Potter and the Prisoner of Azkaban',
              coverImage: '',
              author: {
                id: '1',
                firstName: 'J.K.',
                lastName: 'Rowling'
              },
              category: '1',
              description: 'hello world'
            },
            {
              id: '3',
              title: 'Harry Potter and the Goblet of Fire',
              coverImage: '',
              author: {
                id: '1',
                firstName: 'J.K.',
                lastName: 'Rowling'
              },
              category: '1',
              description: 'hello world'
            },
            {
              id: '4',
              title: 'C All in One Desk Reference For Dummies',
              coverImage: '',
              author: {
                id: '2',
                firstName: 'Dan',
                lastName: 'Gookin'
              },
              category: '1',
              description: 'hello world'
            }
          ]
        }
      }
    };
    const wrapper = ({ children }) => (
      <MockedProvider mocks={[getBooksMOCK]} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useGetBooks(), { wrapper });
    await waitFor(() => expect(result.current.books.length).not.toBe(0));
  });
  it('should get a book', async () => {
    const getBookMOCK = {
      request: {
        query: aBookQuery,
        variables: { id: '1' }
      },
      result: {
        data: {
          getBook: {
            id: '1',
            title: 'Harry Potter and the Chamber of Secrets',
            description: 'hello world',
            coverImage: '',
            category: '1',
            author: {
              id: '1',
              firstName: 'J.K.',
              lastName: 'Rowling'
            }
          }
        }
      }
    };
    const wrapper = ({ children }) => (
      <MockedProvider mocks={[getBookMOCK]} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useGetBook('1'), { wrapper });
    await waitFor(() => expect(result.current.bookLoading).toBeFalsy());
    expect(JSON.stringify(result.current.book)).not.toBe('{}');
  });
  it('should add a book', async () => {
    const addBookMock = [
      {
        request: {
          query: addBookMutation,
          variables: {
            title: 'book 1',
            authorId: '1',
            coverImage: '',
            categoryId: '',
            description: ''
          }
        },
        result: {
          data: {
            addBook: {
              id: '1',
              title: 'book 1',
              description: '',
              coverImage: '',
              category: '',
              author: {
                id: '1',
                firstName: 'w',
                lastName: 'b'
              }
            }
          }
        }
      },
      {
        request: { query: allBooksQuery, variables: {} },
        result: {
          data: {
            getBooks: [
              {
                id: '1',
                title: 'Harry Potter and the Chamber of Secrets',
                coverImage: '',
                author: {
                  id: '1',
                  firstName: 'J.K.',
                  lastName: 'Rowling'
                },
                category: '1',
                description: 'hello world'
              },
              {
                id: '2',
                title: 'Harry Potter and the Prisoner of Azkaban',
                coverImage: '',
                author: {
                  id: '1',
                  firstName: 'J.K.',
                  lastName: 'Rowling'
                },
                category: '1',
                description: 'hello world'
              },
              {
                id: '3',
                title: 'Harry Potter and the Goblet of Fire',
                coverImage: '',
                author: {
                  id: '1',
                  firstName: 'J.K.',
                  lastName: 'Rowling'
                },
                category: '1',
                description: 'hello world'
              },
              {
                id: '4',
                title: 'C All in One Desk Reference For Dummies',
                coverImage: '',
                author: {
                  id: '2',
                  firstName: 'Dan',
                  lastName: 'Gookin'
                },
                category: '1',
                description: 'hello world'
              }
            ]
          }
        }
      }
    ];
    const wrapper = ({ children }) => (
      <MockedProvider mocks={addBookMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAddBook(), { wrapper });

    await waitFor(() => expect(result.current.addBookLoading).toBe(false));
    await act(() => {
      result.current.addBook('book 1', '1', '', '', '');
      waitFor(() => expect(result.current.addBookError).toBeFalsy());
    });
  });
  it('should remove a book', async () => {
    const removeBookMock = [
      {
        request: {
          query: removeBookMutation,
          variables: { id: '1' }
        },
        result: {
          data: { removeBook: jest.fn() }
        }
      }
    ];
    const wrapper = ({ children }) => (
      <MockedProvider mocks={removeBookMock} addTypename={false}>
        {children}
      </MockedProvider>
    );
    const { result } = renderHook(() => useRemoveBook('1'), { wrapper });

    await waitFor(() => expect(result.current.removeBookLoading).toBe(false));
    await act(() => {
      result.current.removeBook();
      waitFor(() => expect(result.current.removeBookLoading).toBeFalsy());
      expect(result.current.removeBookError).toBeFalsy();
    });
  });
  it('should update a book', async () => {
    const updateBookMock = [
      {
        request: {
          query: updateBookMutation,
          variables: {
            id: '1',
            title: 'updatedTitle',
            authorId: '1',
            categoryId: '1',
            description: ''
          }
        },
        result: {
          data: { updateBook: jest.fn() }
        }
      }
    ];
    const wrapper = ({ children }) => (
      <MockedProvider mocks={updateBookMock} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useUpdateBook(), { wrapper });
    await waitFor(() => expect(result.current.updateBookLoading).toBe(false));
    await act(() => {
      result.current.updateBook('1', 'updatedTitle', '1', '1', '');
      waitFor(() => expect(result.current.updateBookLoading).toBeFalsy());
      expect(result.current.updateBookError).toBeFalsy();
    });
  });
});
