import { gql, useQuery, useMutation } from '@apollo/client';
import { getBooks } from './books';

const STATIC_ARRAY = [];
const STATIC_OBJ = {};
//exportable queries
export const getCategory = gql`
  query getCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      books {
        id
      }
    }
  }
`;

//exportable queries
export const getCategories = gql`
  query GetCategories {
    getCategories {
      id
      name
      books {
        id
      }
    }
  }
`;

export const addCategoryMutation = gql`
  mutation addCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
    }
  }
`;

export const updateCategoryMutation = gql`
  mutation UpdateCategory($oldId: ID!, $id: ID!, $name: String!, $bookId: ID!) {
    updateCategory(oldId: $oldId, id: $id, name: $name, bookId: $bookId) {
      id
      name
      books {
        id
      }
    }
  }
`;

export const useGetCategory = id => {
  const { loading, error, data } = useQuery(getCategory, {
    variables: { id }
  });
  return {
    categoryLoading: loading,
    categoryError: error,
    category: data?.getCategory || STATIC_OBJ
  };
};

export const useGetCategories = () => {
  const { loading, error, data } = useQuery(getCategories);
  return {
    categoriesLoading: loading,
    categoriesError: error,
    categories: data?.getCategories || STATIC_ARRAY
  };
};

export const useAddCategory = name => {
  const [add, { loading, error, data }] = useMutation(addCategoryMutation, {
    variables: { name },
    refetchQueries: [{ query: getCategories }, { query: getBooks }]
  });

  return {
    addCategory: name => add({ variables: { name } }),
    addCategoryLoading: loading,
    addCategoryError: error,
    addCategoryData: data
  };
};

export const useUpdateCategory = (oldId, id, name, bookId) => {
  const [update, { loading, error, data }] = useMutation(
    updateCategoryMutation,
    {
      variables: { oldId, id, name, bookId },
      refetchQueries: [{ query: getCategories }, { query: getBooks }]
    }
  );

  return {
    updateCategory: (oldId, id, name, bookId) =>
      update({ variables: { oldId, id, name, bookId } }),
    updateCategoryLoading: loading,
    updateCategoryError: error,
    updateCategoryData: data
  };
};
