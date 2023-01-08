import { gql, useQuery, useMutation } from '@apollo/client';

const EMPTY_ARRAY = [];
//exportable queries
export const anAuthorQuery = gql`
  query getAuthor($id: ID!) {
    getAuthor(id: $id) {
      id
      firstName
      lastName
      books {
        id
        title
        coverImage
      }
    }
  }
`;

export const allAuthorsQuery = gql`
  query getAuthors {
    getAuthors {
      id
      firstName
      lastName
      books {
        id
        title
        coverImage
      }
    }
  }
`;

export const addAuthorMutation = gql`
  mutation addAuthor($firstName: String!, $lastName: String!) {
    addAuthor(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      books {
        id
        title
        coverImage
      }
    }
  }
`;

export const updateAuthorMutation = gql`
  mutation UpdateAuthor(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $books: [String!]!
  ) {
    updateAuthor(
      id: $id
      firstName: $firstName
      lastName: $lastName
      books: $books
    ) {
      id
      firstName
      lastName
      books {
        id
      }
    }
  }
`;

export const useUpdateAuthor = (id, firstName, lastName, books) => {
  const [update, { loading, error, data }] = useMutation(updateAuthorMutation, {
    variables: { id, firstName, lastName, books },
    refetchQueries: ['getAuthors']
  });

  return {
    updateAuthor: (id, firstName, lastName, books) =>
      update({ variables: { id, firstName, lastName, books } }),
    updateAuthorLoading: loading,
    updateAuthorError: error,
    updateAuthorData: data
  };
};

export const useGetAuthors = () => {
  const { loading, error, data } = useQuery(allAuthorsQuery);
  return {
    authorsLoading: loading,
    authorsError: error,
    authors: data?.getAuthors || EMPTY_ARRAY
  };
};

export const useGetAuthor = id => {
  const { loading, error, data } = useQuery(anAuthorQuery, {
    variables: { id }
  });
  return {
    authorLoading: loading,
    authorError: error,
    author: data?.getAuthor || EMPTY_ARRAY
  };
};

export const useAddAuthor = (firstName, lastName) => {
  const [add, { loading, error, data }] = useMutation(addAuthorMutation, {
    variables: { firstName, lastName },
    refetchQueries: ['getAuthors']
  });

  return {
    addAuthor: (firstName, lastName) =>
      add({ variables: { firstName, lastName } }),
    addAuthorLoading: loading,
    addAuthorError: error,
    addAuthorData: data
  };
};
