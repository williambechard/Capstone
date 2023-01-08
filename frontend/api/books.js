import { gql, useQuery, useMutation } from '@apollo/client';
import { getCategories } from './categories';
import { allAuthorsQuery } from './authors';
const STATIC_ARRAY = [];

//exportable quries
export const aBookQuery = gql`
  query getBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      coverImage
      category {
        id
        name
      }
      author {
        id
        firstName
        lastName
        books {
          id
          title
        }
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
      description
      author {
        id
        firstName
        lastName
        books {
          id
        }
      }
      category {
        id
        name
      }
    }
  }
`;

export const addBookMutation = gql`
  mutation addBook(
    $title: String!
    $authorId: String!
    $coverImage: String
    $categoryId: String!
    $description: String
  ) {
    addBook(
      title: $title
      authorId: $authorId
      coverImage: $coverImage
      categoryId: $categoryId
      description: $description
    ) {
      id
      title
      coverImage
      category {
        id
        name
      }
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
  categoryId,
  description
) => {
  const [add, { loading, error, data }] = useMutation(addBookMutation, {
    variables: { title, authorId, coverImage, categoryId, description },
    refetchQueries: [
      'getBooks',
      { query: getCategories },
      { query: allAuthorsQuery }
    ]
  });
  return {
    addBook: (title, authorId, coverImage, categoryId, description) =>
      add({
        variables: {
          title,
          authorId,
          coverImage,
          categoryId,
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

export const updateBookMutation = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String!
    $authorId: String!
    $categoryId: String!
    $description: String
    $coverImage: String
  ) {
    updateBook(
      id: $id
      title: $title
      authorId: $authorId
      categoryId: $categoryId
      description: $description
      coverImage: $coverImage
    ) {
      id
      title
      coverImage
      description
      category {
        id
        name
      }
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

export const useUpdateBook = (
  id,
  title,
  authorId,
  categoryId,
  description,
  coverImage
) => {
  const [update, { loading, error, data }] = useMutation(updateBookMutation, {
    variables: { id, title, authorId, categoryId, description, coverImage },
    refetchQueries: ['getBooks', { query: getCategories }]
  });

  return {
    updateBook: (id, title, authorId, categoryId, description, coverImage) =>
      update({
        variables: { id, title, authorId, categoryId, description, coverImage }
      }),
    updateBookLoading: loading,
    updateBookError: error,
    updateBookData: data
  };
};

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
