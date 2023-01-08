import { gql } from 'apollo-server-express';

// Pre-seeded data
const books = [
  {
    id: '1',
    title: 'Harry Potter and the Chamber of Secrets',
    author: '1',
    coverImage:
      'https://m.media-amazon.com/images/I/51mFoFmu0EL._AC_SY780_.jpg',
    category: '1',
    description:
      'Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.'
  },
  {
    id: '2',
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: '1',
    coverImage:
      'https://m.media-amazon.com/images/I/51DQeuJ5QDL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    category: '1'
  },
  {
    id: '3',
    title: 'Harry Potter and the Goblet of Fire',
    author: '1',
    coverImage:
      'https://m.media-amazon.com/images/I/51gy+g8Z+1L._SX343_BO1,204,203,200_.jpg',
    category: '2'
  },
  {
    id: '4',
    title: 'C All in One Desk Reference For Dummies',
    author: '2',
    coverImage:
      'https://m.media-amazon.com/images/I/51LNAmfIQ3L._SX404_BO1,204,203,200_.jpg',
    category: '3'
  }
];
const authors = [
  {
    id: '1',
    firstName: 'J.K.',
    lastName: 'Rowling',
    books: ['1', '2', '3']
  },
  {
    id: '2',
    firstName: 'Dan',
    lastName: 'Gookin',
    books: ['4']
  },
  {
    id: '3',
    firstName: 'Ayn',
    lastName: 'Rand',
    books: []
  },
  {
    id: '4',
    firstName: 'George',
    lastName: 'Orwell',
    books: []
  },
  {
    id: '5',
    firstName: 'John',
    lastName: 'Steinbeck',
    books: []
  },
  {
    id: '6',
    firstName: 'F. Scott',
    lastName: 'Fitzgerald',
    books: []
  },
  {
    id: '7',
    firstName: 'Ray',
    lastName: 'Bradbury',
    books: []
  },
  {
    id: '8',
    firstName: 'William',
    lastName: 'Faulkner',
    books: []
  }
];
const categories = [
  {
    id: '1',
    name: 'Fantasy',
    books: ['1', '2']
  },
  {
    id: '2',
    name: 'Fiction',
    books: ['3']
  },
  {
    id: '3',
    name: 'Programming',
    books: ['4']
  }
];

export const typeDefs = gql`
  "An individual book, contains a title, author, and an array of category ids"
  type Book {
    id: ID!
    "The book's title"
    title: String!
    "The book's author (an ID)"
    author: Author!
    "The book's cover image"
    coverImage: String
    "The book's category (an ID)"
    category: Category
    "The book's description"
    description: String
  }

  "An individual author, contains a first name, last name, and an array of book ids."
  type Author {
    id: ID!
    "The author's first name"
    firstName: String
    "The author's last name"
    lastName: String
    "The author's books (array of IDs)"
    books: [Book!]!
  }

  "An individual category, contains a name and an array of book ids."
  type Category {
    id: ID!
    "The category's name"
    name: String!
    "The category's books (array of IDs)"
    books: [Book!]!
  }

  type Query {
    "Gets all of the stored books"
    getBooks: [Book!]!
    "Gets a book by its id"
    getBook(id: ID!): Book
    "Gets all of the stored authors"
    getAuthors: [Author!]!
    "Gets an author by its id"
    getAuthor(id: ID!): Author
    "Gets all of the stored categories"
    getCategories: [Category!]!
    "Gets a category by its id"
    getCategory(id: ID!): Category
  }

  type Mutation {
    "Creates a new book"
    addBook(
      title: String!
      authorId: String!
      coverImage: String
      categoryId: String!
      description: String
    ): Book
    "Updates a book"
    updateBook(
      id: ID!
      title: String!
      authorId: String!
      coverImage: String
      categoryId: String!
      description: String
    ): Book
    "Removes a book by its id"
    removeBook(id: ID!): ID
    "Creates a new author"
    addAuthor(firstName: String!, lastName: String!): Author
    "Updates an author"
    updateAuthor(
      id: ID!
      firstName: String!
      lastName: String!
      books: [String!]!
    ): Author
    "Removes an author by its id"
    removeAuthor(id: ID!): ID
    "Creates a new category"
    addCategory(name: String!): Category
    "Updates a category"
    updateCategory(oldId: ID!, id: ID!, name: String!, bookId: ID!): Category
    "Removes a category by its id"
    removeCategory(id: ID!): ID
  }
`;

export const resolvers = {
  Book: {
    author: ({ author: authorId }) =>
      authors.find(author => author.id === authorId),
    category: ({ category: categoryId }) =>
      categories.find(category => category.id === categoryId)
  },
  Author: {
    books: ({ books: allBooks }) =>
      books.filter(book => allBooks.includes(book.id))
  },
  Category: {
    books: ({ books: allBooks }) =>
      books.filter(book => allBooks.includes(book.id))
  },
  Query: {
    getBooks: () => books,
    getBook: (_parent, { id }) => books.find(book => book.id === id),
    getAuthors: () =>
      authors.sort((a, b) => {
        return a.lastName.localeCompare(b.lastName);
      }),
    getAuthor: (_parent, { id }) => authors.find(author => author.id === id),
    getCategories: () =>
      categories.sort((a, b) => {
        return a.name.localeCompare(b.name);
      }),
    getCategory: (_parent, { id }) =>
      categories.find(category => category.id === id)
  },
  Mutation: {
    addBook: (
      _parent,
      { title, authorId, coverImage, categoryId, description }
    ) => {
      const book = {
        id: String(books.length + 1),
        title,
        author: authorId,
        coverImage: coverImage,
        category: categoryId,
        description: description
      };

      books.push(book);
      return book;
    },
    addAuthor: (_parent, { firstName, lastName }) => {
      const author = {
        id: String(authors.length + 1),
        firstName,
        lastName,
        books: []
      };

      authors.push(author);
      return author;
    },
    addCategory: (_parent, { name }) => {
      const category = {
        id: String(categories.length + 1),
        name,
        books: []
      };
      categories.push(category);
      return category;
    },
    updateBook: (
      _parent,
      { id, title, authorId, categoryId, description, coverImage }
    ) => {
      const bookIndex = books.findIndex(book => book.id === id);
      if (bookIndex === -1) throw new Error('This book does not exist.');

      const book = {
        id,
        title,
        author: authorId,
        category: categoryId,
        coverImage: coverImage,
        description
      };
      books[bookIndex] = book;

      return book;
    },
    updateAuthor: (_parent, { id, firstName, lastName, books }) => {
      const authorIndex = authors.findIndex(author => author.id === id);
      if (authorIndex === -1) throw new Error('This author does not exist.');
      const author = {
        id,
        firstName,
        lastName,
        books
      };

      authors[authorIndex] = author;
      return author;
    },
    updateCategory: (_parent, { oldId, id, name, bookId }) => {
      //remove book from oldCategory
      if (oldId != '-1') {
        const oldCategoryIndex = categories.findIndex(
          category => category.id === oldId
        );
        //if book appears in another category, then remove it
        if (categories[oldCategoryIndex].books !== undefined) {
          const indexToRemove = categories[oldCategoryIndex].books.find(
            book => book.id === bookId
          );

          if (indexToRemove === -1) throw new Error('index not found');

          categories[oldCategoryIndex].books.splice(indexToRemove, 1);
        }
      }

      //get index of targetCategory
      const categoryIndex = categories.findIndex(
        category => category.id === id
      );
      if (categoryIndex !== -1) {
        const category = {
          id,
          name: categories[categoryIndex].name
        };

        let allBooks = categories[categoryIndex].books;

        allBooks.push(bookId);

        category.books = allBooks;
        categories[categoryIndex] = category;
        return category;
      }
    },
    removeBook: (_parent, { id }) => {
      const bookIndex = books.findIndex(book => book.id === id);
      if (bookIndex === -1) throw new Error('This book does not exist.');
      const [book] = books.splice(bookIndex, 1);
      return book.id;
    },
    removeAuthor: (_parent, { id }) => {
      const authorIndex = authors.findIndex(author => author.id === id);
      if (authorIndex === -1) throw new Error('This author does not exist.');
      const [author] = authors.splice(authorIndex, 1);
      return author.id;
    },
    removeCategory: (_parent, { id }) => {
      const categoryIndex = categories.findIndex(
        category => category.id === id
      );
      if (categoryIndex === -1)
        throw new Error('This category does not exist.');
      const [category] = categories.splice(categoryIndex, 1);
      return category.id;
    }
  }
};
