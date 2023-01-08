import { gql, useQuery, useMutation } from '@apollo/client';

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
    }
  }
`;

export const addAuthorMutation = gql`
  mutation addAuthor($firstName: String!, $lastName: String!) {
    addAuthor(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const useGetAuthors = () => {
  const { loading, error, data } = useQuery(allAuthorsQuery);
  return {
    authorsLoading: loading,
    authorsError: error,
    authors: data?.getAuthors || []
  };
};

export const useGetAuthor = id => {
  const { loading, error, data } = useQuery(anAuthorQuery, {
    variables: { id }
  });
  return {
    authorLoading: loading,
    authorError: error,
    author: data?.getAuthor || []
  };
};

export const useAddAuthor = (firstName, lastName) => {
  const [add, { loading, error, data }] = useMutation(addAuthorMutation, {
    variables: { firstName, lastName }
  });

  return {
    addAuthor: (firstName, lastName) =>
      add({ variables: { firstName, lastName } }),
    addAuthorLoading: loading,
    addAuthorError: error,
    addAuthorData: data
  };
};
