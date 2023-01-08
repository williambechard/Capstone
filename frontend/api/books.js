import { gql, useQuery, useMutation } from "@apollo/client";

export const useGetBooks = () => {
  const query = gql`
    query getBooks {
      getBooks {
        id
        title
        coverImage
        author {
          id
          firstName
          lastName
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  return {
    booksLoading: loading,
    booksError: error,
    books: data?.getBooks || [],
  };
};

export const useGetBook = (id) => {
  const query = gql`
    query getBook($id: ID!) {
      getBook(id: $id) {
        id
        title
        coverImage
        author {
          id
          firstName
          lastName
        }
        description
      }
    }
  `;

  const { loading, error, data } = useQuery(query, { variables: { id } });

  return {
    bookLoading: loading,
    bookError: error,
    book: data?.getBook || {},
  };
};

export const useAddBook = (
  title,
  authorId,
  coverImage,
  categoryIds,
  description
) => {
  const mutation = gql`
    mutation addBook(
      $title: String!
      $authorId: String!
      $coverImage: String
      $categoryIds: [String!]!
      $description: String
    ) {
      addBook(
        title: $title
        authorId: $authorId
        coverImage: $coverImage
        categoryIds: $categoryIds
        description: $description
      ) {
        id
        title
        coverImage
        author {
          id
          firstName
          lastName
        }
        description
      }
    }
  `;
  const [add, { loading, error, data }] = useMutation(mutation, {
    variables: { title, authorId, coverImage, categoryIds, description },
  });
  return {
    addBook: (title, authorId, coverImage, categoryIds, description) =>
      add({
        variables: {
          title,
          authorId,
          coverImage,
          categoryIds,
          description,
        },
      }),
    addBookLoading: loading,
    addBookError: error,
    addBookData: data,
  };
};

export const useRemoveBook = () => {
  const mutation = gql`
    mutation removeBook($id: ID!) {
      removeBook(id: $id)
    }
  `;

  const [removeBook, { loading, error, data }] = useMutation(mutation);

  return {
    removeBook,
    removeBookLoading: loading,
    removeBookError: error,
    removeBookData: data,
  };
};
