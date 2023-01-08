import '@testing-library/jest-dom';
import { act, renderHook, waitFor } from '@testing-library/react';
import {
  useAddAuthor,
  useGetAuthor,
  useGetAuthors,
  allAuthorsQuery,
  anAuthorQuery,
  addAuthorMutation
} from '../../../api/authors';
import { MockedProvider } from '@apollo/client/testing';

describe('api Authors test', () => {
  it('should get all authors', async () => {
    const getAuthorsMock = {
      request: {
        query: allAuthorsQuery,
        variables: {}
      },
      result: {
        data: {
          getAuthors: [
            {
              id: '1',
              firstName: 'J.K.',
              lastName: 'Rowling'
            },
            {
              id: '2',
              firstName: 'Dan',
              lastName: 'Gookin'
            }
          ]
        }
      }
    };
    const wrapper = ({ children }) => (
      <MockedProvider mocks={[getAuthorsMock]} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useGetAuthors(), { wrapper });

    await waitFor(() => expect(result.current.authors.length).not.toBe(0));

    expect(result.current.authorsError).toBeFalsy();
    expect(result.current.authorsLoading).toBeFalsy();
  });
  it('should get an author', async () => {
    const getAuthorMOCK = {
      request: {
        query: anAuthorQuery,
        variables: { id: '1' }
      },
      result: {
        data: {
          getAuthor: {
            id: '1',
            firstName: 'J.K.',
            lastName: 'Rowling',
            books: [
              {
                id: '1',
                title: 'Harry Potter'
              }
            ]
          }
        }
      }
    };
    const wrapper = ({ children }) => (
      <MockedProvider mocks={[getAuthorMOCK]} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useGetAuthor('1'), { wrapper });
    await waitFor(() => expect(result.current.authorLoading).toBeFalsy());
    expect(JSON.stringify(result.current.author)).toBe(
      JSON.stringify({
        id: '1',
        firstName: 'J.K.',
        lastName: 'Rowling',
        books: [
          {
            id: '1',
            title: 'Harry Potter'
          }
        ]
      })
    );
  });
  it('should add an author', async () => {
    const addAuthorMock = {
      request: {
        query: addAuthorMutation,
        variables: {
          firstName: 'Jim',
          lastName: 'Bean'
        }
      },
      result: {
        data: {
          addAuthor: {
            id: '1',
            firstName: 'Jim',
            lastName: 'Bean'
          }
        }
      }
    };
    const wrapper = ({ children }) => (
      <MockedProvider mocks={[addAuthorMock]} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result } = renderHook(() => useAddAuthor(), { wrapper });

    await waitFor(() => expect(result.current.addAuthorLoading).toBe(false));

    await act(async () => {
      const authorInfo = await result.current.addAuthor('Jim', 'Bean');
      expect(authorInfo.data.addAuthor.id).toBe('1');
    });
  });
});
