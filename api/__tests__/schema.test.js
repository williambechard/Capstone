import { getTestServer } from './utils/apollo-test-server';
import { clearData } from './utils/clear-data';
import { seedData } from './utils/seed-data';

describe('schema', () => {
  const server = getTestServer();

  beforeEach(async () => {
    const [bookRes, authorRes, catRes] = await clearData(server);
    const [bookSeedRes, authorSeedRes, catSeedRes] = await seedData(server);
  });
  describe('getBooks', () => {
    const query = `
        query {
          getBooks {
            id
            title
          }
        }
      `;
    it('should return a list of books', () => {
      return server.executeOperation({ query }).then(response => {
        expect(response.body.singleResult.data?.getBooks).toEqual([
          {
            id: '1',
            title: 'Harry Potter and the Chamber of Secrets'
          }
        ]);
        expect(response.body.singleResult.data?.errors).toBeUndefined();
      });
    });
  });

  describe('getBook', () => {
    const query = `
        query getBook($id: ID!) {
          getBook(id: $id) {
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
    it('should return a book by id', () => {
      return server
        .executeOperation({ query, variables: { id: '1' } })
        .then(response => {
          expect(response.body.singleResult.data?.getBook).toEqual({
            id: '1',
            title: 'Harry Potter and the Chamber of Secrets',
            author: {
              id: '1',
              firstName: 'J.K.',
              lastName: 'Rowling'
            },
            categories: [
              {
                id: '1',
                name: 'Fantasy'
              },
              {
                id: '2',
                name: 'Fiction'
              }
            ]
          });
          expect(response.body.singleResult.data?.errors).toBeUndefined();
        });
    });
  });

  describe('getAuthors', () => {
    const query = `
        query {
          getAuthors {
            id
            firstName
            lastName
          }
        }
      `;
    it('should return a list of authors', () => {
      return server.executeOperation({ query }).then(response => {
        expect(response.body.singleResult.data?.getAuthors).toEqual([
          {
            id: '1',
            firstName: 'J.K.',
            lastName: 'Rowling'
          }
        ]);
        expect(response.body.singleResult.data?.errors).toBeUndefined();
      });
    });
  });

  describe('getAuthor', () => {
    const query = `
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
    it('should return an author by id', () => {
      return server
        .executeOperation({ query, variables: { id: '1' } })
        .then(response => {
          expect(response.body.singleResult.data?.getAuthor).toEqual({
            id: '1',
            firstName: 'J.K.',
            lastName: 'Rowling',
            books: [
              {
                id: '1',
                title: 'Harry Potter and the Chamber of Secrets'
              }
            ]
          });
          expect(response.body.singleResult.data?.errors).toBeUndefined();
        });
    });
  });

  describe('getCategories', () => {
    const query = `
        query {
          getCategories {
            id
            name
          }
        }
      `;
    it('should return a list of categories', () => {
      return server.executeOperation({ query }).then(response => {
        expect(response.body.singleResult.data?.getCategories).toEqual([
          {
            id: '1',
            name: 'Fantasy'
          },
          {
            id: '2',
            name: 'Fiction'
          }
        ]);
        expect(response.body.singleResult.data?.errors).toBeUndefined();
      });
    });
  });

  describe('getCategory', () => {
    const query = `
        query getCategory($id: ID!) {
          getCategory(id: $id) {
            id
            name
            books {
              id
              title
            }
          }
        }
      `;
    it('should return a category by id', () => {
      return server
        .executeOperation({ query, variables: { id: '1' } })
        .then(response => {
          expect(response.body.singleResult.data?.getCategory).toEqual({
            id: '1',
            name: 'Fantasy',
            books: [
              {
                id: '1',
                title: 'Harry Potter and the Chamber of Secrets'
              }
            ]
          });
          expect(response.body.singleResult.data?.errors).toBeUndefined();
        });
    });
  });

  /*
   * Mutations
   */
  describe('addBook', () => {
    const mutation = `
        mutation addBook($title: String!, $authorId: ID!, $categoryIds: [ID!]!) {
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
    it('should add a book', () => {
      // Add the author first before we add the book
      return server
        .executeOperation({
          query: addAuthorMutation,
          variables: { firstName: 'Cornelia', lastName: 'Funke' }
        })
        .then(response => {
          const { id } = response.body.singleResult.data?.addAuthor;
          return server.executeOperation({
            query: mutation,
            variables: {
              title: 'The Hobbit',
              authorId: id,
              categoryIds: ['1', '2']
            }
          });
        })
        .then(response => {
          expect(response.body.singleResult.data?.addBook).toEqual({
            id: '2',
            title: 'The Hobbit',
            author: {
              id: '2',
              firstName: 'Cornelia',
              lastName: 'Funke'
            },
            categories: [
              {
                id: '1',
                name: 'Fantasy'
              },
              {
                id: '2',
                name: 'Fiction'
              }
            ]
          });
          expect(response.body.singleResult.data?.errors).toBeUndefined();
        });
    });
  });

  describe('updateBook', () => {
    const mutation = `
        mutation updateBook($id: ID!, $title: String!, $authorId: ID!, $categoryIds: [ID!]!) {
          updateBook(id: $id, title: $title, authorId: $authorId, categoryIds: $categoryIds) {
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
    it('should update a book', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: {
            id: '1',
            title: 'Harry Potter and the Prisoner of Azkaban',
            authorId: '1',
            categoryIds: ['1']
          }
        })
        .then(response => {
          expect(response.body.singleResult.data?.updateBook).toEqual({
            id: '1',
            title: 'Harry Potter and the Prisoner of Azkaban',
            author: {
              id: '1',
              firstName: 'J.K.',
              lastName: 'Rowling'
            },
            categories: [
              {
                id: '1',
                name: 'Fantasy'
              }
            ]
          });
          expect(response.body.singleResult.data?.errors).toBeUndefined();
        });
    });

    it('should throw an error if the book does not exist', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: {
            id: '3',
            title: 'Harry Potter and the Prisoner of Azkaban',
            authorId: '1',
            categoryIds: ['1']
          }
        })
        .then(response => {
          expect(response.body.singleResult.data?.updateBook).toBeNull();
          expect(response.body.singleResult.errors[0].message).toEqual(
            'This book does not exist.'
          );
        });
    });
  });

  describe('removeBook', () => {
    const mutation = `
        mutation removeBook($id: ID!) {
          removeBook(id: $id)
        }
      `;

    const getBooksQuery = `
        query {
          getBooks {
            id
            title
          }
        }`;
    it('should remove a book', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: {
            id: '1'
          }
        })
        .then(response => {
          expect(response.body.singleResult.data?.removeBook).toBe('1');
          expect(response.body.singleResult.data?.errors).toBeUndefined();

          return server.executeOperation({ query: getBooksQuery });
        })
        .then(response => {
          expect(response.body.singleResult.data?.getBooks.length).toEqual(0);
        });
    });

    it('should throw an error if the book does not exist', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: {
            id: '3'
          }
        })
        .then(response => {
          expect(response.body.singleResult.data?.removeBook).toBeNull();
          expect(response.body.singleResult.errors[0].message).toEqual(
            'This book does not exist.'
          );
        });
    });
  });

  describe('addAuthor', () => {
    const mutation = `
        mutation addAuthor($firstName: String!, $lastName: String!) {
          addAuthor(firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
          }
        }
      `;
    it('should add an author', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: { firstName: 'Stephen', lastName: 'King' }
        })
        .then(response => {
          expect(response.body.singleResult.data?.addAuthor).toEqual({
            id: '2',
            firstName: 'Stephen',
            lastName: 'King'
          });
          expect(response.body.singleResult.data?.errors).toBeUndefined();
        });
    });
  });

  describe('updateAuthor', () => {
    const mutation = `
        mutation updateAuthor($id: ID!, $firstName: String!, $lastName: String!) {
          updateAuthor(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
          }
        }
      `;
    it('should update an author', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: { id: '1', firstName: 'Carnelia', lastName: 'Funke' }
        })
        .then(response => {
          expect(response.body.singleResult.data?.updateAuthor).toEqual({
            id: '1',
            firstName: 'Carnelia',
            lastName: 'Funke'
          });
          expect(response.body.singleResult.data?.errors).toBeUndefined();
        });
    });

    it('should throw an error if the author does not exist', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: { id: '100', firstName: 'Carnelia', lastName: 'Funke' }
        })
        .then(response => {
          expect(response.body.singleResult.data?.updateAuthor).toBeNull();
          expect(response.body.singleResult.errors[0].message).toEqual(
            'This author does not exist.'
          );
        });
    });
  });

  describe('removeAuthor', () => {
    const mutation = `
        mutation removeAuthor($id: ID!) {
          removeAuthor(id: $id)
        }
      `;

    const getAuthorsQuery = `
        query {
          getAuthors {
            id
            firstName
            lastName
          }
        }`;
    it('should remove an author', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: {
            id: '1'
          }
        })
        .then(response => {
          expect(response.body.singleResult.data?.removeAuthor).toBe('1');
          expect(response.body.singleResult.data?.errors).toBeUndefined();

          return server.executeOperation({ query: getAuthorsQuery });
        })
        .then(response => {
          expect(response.body.singleResult.data?.getAuthors.length).toEqual(0);
        });
    });

    it('should throw an error if the author does not exist', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: {
            id: '100'
          }
        })
        .then(response => {
          expect(response.body.singleResult.data?.removeAuthor).toBeNull();
          expect(response.body.singleResult.errors[0].message).toEqual(
            'This author does not exist.'
          );
        });
    });
  });

  describe('addCategory', () => {
    const mutation = `
        mutation addCategory($name: String!) {
          addCategory(name: $name) {
            id
            name
          }
        }
      `;
    it('should add a category', () => {
      return server
        .executeOperation({ query: mutation, variables: { name: 'Horror' } })
        .then(response => {
          expect(response.body.singleResult.data?.addCategory).toEqual({
            id: '3',
            name: 'Horror'
          });
          expect(response.body.singleResult.data?.errors).toBeUndefined();
        });
    });
  });

  describe('updateCategory', () => {
    const mutation = `
        mutation updateCategory($id: ID!, $name: String!) {
          updateCategory(id: $id, name: $name) {
            id
            name
          }
        }
      `;
    it('should update a category', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: { id: '1', name: 'Sci-fi' }
        })
        .then(response => {
          expect(response.body.singleResult.data?.updateCategory).toEqual({
            id: '1',
            name: 'Sci-fi'
          });
          expect(response.body.singleResult.data?.errors).toBeUndefined();
        });
    });

    it('should throw an error if the category does not exist', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: { id: 'doesnt-exist', name: 'no work' }
        })
        .then(response => {
          expect(response.body.singleResult.data?.updateCategory).toBeNull();
          expect(response.body.singleResult.errors[0].message).toEqual(
            'This category does not exist.'
          );
        });
    });
  });

  describe('removeCategory', () => {
    const mutation = `
        mutation removeCategory($id: ID!) {
          removeCategory(id: $id)
        }
      `;

    const getCategoriesQuery = `
        query {
          getCategories {
            id
            name
          }
        }`;
    it('should remove a category', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: {
            id: '1'
          }
        })
        .then(response => {
          expect(response.body.singleResult.data?.removeCategory).toBe('1');
          expect(response.body.singleResult.data?.errors).toBeUndefined();

          return server.executeOperation({ query: getCategoriesQuery });
        })
        .then(response => {
          expect(response.body.singleResult.data?.getCategories.length).toEqual(
            1
          );
        });
    });

    it('should throw an error if the category does not exist', () => {
      return server
        .executeOperation({
          query: mutation,
          variables: {
            id: '100'
          }
        })
        .then(response => {
          expect(response.body.singleResult.data?.removeCategory).toBeNull();
          expect(response.body.singleResult.errors[0].message).toEqual(
            'This category does not exist.'
          );
        });
    });
  });
});
