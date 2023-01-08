import { gql, useQuery, useMutation } from '@apollo/client';
const STATIC_ARRAY = [];

//exportable quries
export const aBookQuery = gql`
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

export const allBooksQuery = gql`
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

export const addBookMutation = gql`
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

export const useGetBooks = () => {
  const { loading, error, data } = useQuery(allBooksQuery);

  return {
    booksLoading: loading,
    booksError: error,
    books: data?.getBooks || STATIC_ARRAY
  };
};

export const useGetBook = id => {
  const { loading, error, data } = useQuery(aBookQuery, { variables: { id } });

  return {
    bookLoading: loading,
    bookError: error,
    book: data?.getBook || {}
  };
};

export const useAddBook = (
  title,
  authorId,
  coverImage,
  categoryIds,
  description
) => {
  const [add, { loading, error, data }] = useMutation(addBookMutation, {
    variables: { title, authorId, coverImage, categoryIds, description },
    refetchQueries: ['getBooks']
  });
  return {
    addBook: (title, authorId, coverImage, categoryIds, description) =>
      add({
        variables: {
          title,
          authorId,
          coverImage,
          categoryIds,
          description
        }
      }),
    addBookLoading: loading,
    addBookError: error,
    addBookData: data?.addBook || {}
  };
};

export const removeBookMutation = gql`
  mutation removeBook($id: ID!) {
    removeBook(id: $id)
  }
`;
export const useRemoveBook = id => {
  const [removeBook, { loading, error, data }] = useMutation(
    removeBookMutation,
    {
      variables: { id }
    }
  );

  return {
    removeBook,
    removeBookLoading: loading,
    removeBookError: error,
    removeBookData: data
  };
};
