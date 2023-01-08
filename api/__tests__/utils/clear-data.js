const getBooksQuery = `
query {
    getBooks {
        id
        title
    }
}
`;

const removeBookMutation = `
        mutation removeBook($id: ID!) {
          removeBook(id: $id)
        }
      `;

const getAuthorsQuery = `
        query {
          getAuthors {
            id
            firstName
            lastName
          }
        }
      `;

const removeAuthorMutation = `
        mutation removeAuthor($id: ID!) {
            removeAuthor(id: $id)
        }
        `;

const getCategoriesQuery = `
      query {
        getCategories {
          id
          name
        }
      }
    `;

const removeCategoryMutation = `
    mutation removeCategory($id: ID!) {
        removeCategory(id: $id)
    }
    `;
export const clearData = async testServer => {
  const bookResponse = await testServer.executeOperation({
    query: getBooksQuery
  });
  const books = bookResponse.body.singleResult.data.getBooks;

  const authorResponse = await testServer.executeOperation({
    query: getAuthorsQuery
  });
  const authors = authorResponse.body.singleResult.data.getAuthors;

  const categoryResponse = await testServer.executeOperation({
    query: getCategoriesQuery
  });
  const categories = categoryResponse.body.singleResult.data.getCategories;

  return Promise.all([
    Promise.all(
      books.map(book =>
        testServer.executeOperation({
          query: removeBookMutation,
          variables: {
            id: book.id
          }
        })
      )
    ),
    Promise.all(
      authors.map(author =>
        testServer.executeOperation({
          query: removeAuthorMutation,
          variables: {
            id: author.id
          }
        })
      )
    ),
    Promise.all(
      categories.map(category =>
        testServer.executeOperation({
          query: removeCategoryMutation,
          variables: {
            id: category.id
          }
        })
      )
    )
  ]);
};
