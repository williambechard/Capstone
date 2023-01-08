import { gql, useQuery, useMutation } from "@apollo/client";

export const useGetAuthors = () => {
  const query = gql`
    query getAuthors {
      getAuthors {
        id
        firstName
        lastName
      }
    }
  `;
  const { loading, error, data } = useQuery(query);
  return {
    authorsLoading: loading,
    authorsError: error,
    authors: data?.getAuthors || [],
  };
};

export const useGetAuthor = (id) => {
  const query = gql`
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
  const { loading, error, data } = useQuery(query, {
    variables: { id },
  });
  return {
    authorLoading: loading,
    authorError: error,
    author: data?.getAuthor || [],
  };
};

export const useAddAuthor = (firstName, lastName) => {
  const mutation = gql`
    mutation addAuthor($firstName: String!, $lastName: String!) {
      addAuthor(firstName: $firstName, lastName: $lastName) {
        id
        firstName
        lastName
      }
    }
  `;

  const [add, { loading, error, data }] = useMutation(mutation, {
    variables: { firstName, lastName },
  });

  return {
    addAuthor: (firstName, lastName) =>
      add({ variables: { firstName, lastName } }),
    addAuthorLoading: loading,
    addAuthorError: error,
    addAuthorData: data,
  };
};
