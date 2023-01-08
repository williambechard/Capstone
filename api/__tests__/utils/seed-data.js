import { books, authors, categories } from '../data/schema.data';

const addBookMutation = `
  mutation AddBook($title: String!, $authorId: ID!, $categoryIds: [ID!]!) {
    addBook(title: $title, authorId: $authorId, categoryIds: $categoryIds) {
        id
        title
        author {
            id
            firstName
            lastName
        }
        categories {
            id
            name
        }
    }
  }
  `;

const addAuthorMutation = `
        mutation addAuthor($firstName: String!, $lastName: String!) {
          addAuthor(firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
          }
        }
      `;

const addCategoryMutation = `
        mutation addCategory($name: String!) {
          addCategory(name: $name) {
            id
            name
          }
        }
      `;

export const seedData = async testServer => {
  return Promise.all([
    Promise.all(
      books.map(async book =>
        testServer.executeOperation({
          query: addBookMutation,
          variables: {
            title: book.title,
            authorId: book.author,
            categoryIds: book.categories
          }
        })
      )
    ),
    Promise.all(
      authors.map(async author =>
        testServer.executeOperation({
          query: addAuthorMutation,
          variables: {
            firstName: author.firstName,
            lastName: author.lastName
          }
        })
      )
    ),
    Promise.all(
      categories.map(async category =>
        testServer.executeOperation({
          query: addCategoryMutation,
          variables: {
            name: category.name
          }
        })
      )
    )
  ]);
};
