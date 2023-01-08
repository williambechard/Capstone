import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import AddBookForm from '../../../components/AddBookForm';
import {
  useAddBook,
  useGetBook,
  useGetBooks,
  useUpdateBook
} from '../../../api/books';
import {
  useAddAuthor,
  useGetAuthors,
  useUpdateAuthor
} from '../../../api/authors';
import { useGetCategories, useUpdateCategory } from '../../../api/categories';
import userEvent from '@testing-library/user-event';
import {
  AuthorsProvider,
  BooksProvider,
  CategoriesProvider
} from '../../../providers';
import { debug } from 'jest-preview';

jest.mock('../../../api/books');
jest.mock('../../../api/authors');
jest.mock('../../../api/categories');

beforeEach(() => {
  jest.resetAllMocks();
  useGetBooks.mockReturnValue({
    bookLoading: false,
    bookError: false,
    books: [
      {
        id: '1',
        title: 'Hello',
        description: 'Hello World',
        author: {
          firstName: 'Jim',
          lastName: 'Bob'
        }
      }
    ]
  });

  useGetCategories.mockReturnValue({
    categoriesLoading: false,
    categoriesError: false,
    categories: [
      {
        id: '1',
        name: 'Fantasy',
        books: ['1']
      }
    ]
  });

  useUpdateCategory.mockReturnValue({
    updateCategoryLoading: false,
    updateCategoryError: false,
    updateCategory: (oldId, id, name, bookId) => jest.fn()
  });

  useUpdateBook.mockReturnValue({
    updateBook: (id, title, authorId, categoryId, description) => jest.fn(),
    updateBookLoading: false,
    updateBookError: false
  });

  useAddBook.mockReturnValue({
    addBook: jest.fn()
  });

  useUpdateAuthor.mockReturnValue({
    updateAuthor: (id, firstName, lastName, bookToAdd) => jest.fn(),
    updateAuthorLoading: false,
    updateAuthorError: false
  });
});

describe('AddBookForm component test', () => {
  describe('no Submit tests', () => {
    it('should display the default AddBookForm', () => {
      useAddBook.mockReturnValue({
        addBook: jest.fn()
      });
      useAddAuthor.mockReturnValue({
        addAuthor: jest.fn()
      });
      useGetAuthors.mockReturnValue({
        authors: jest.fn()
      });

      render(
        <BooksProvider>
          <CategoriesProvider>
            <AuthorsProvider>
              <AddBookForm />
            </AuthorsProvider>
          </CategoriesProvider>
        </BooksProvider>
      );

      const addBookFormComponent = screen.getByRole('form');
      expect(addBookFormComponent).toBeInTheDocument();
      expect(addBookFormComponent).toHaveStyle(`width: 100%; height: 100%;`);
    });

    it('should call the onClick function when Cancel Button is pressed', async () => {
      const mockCallBack = jest.fn();
      useAddBook.mockReturnValue({
        addBook: jest.fn()
      });
      useAddAuthor.mockReturnValue({
        addAuthor: jest.fn()
      });
      useGetAuthors.mockReturnValue({
        authors: jest.fn()
      });

      render(
        <BooksProvider>
          <CategoriesProvider>
            <AuthorsProvider>
              <AddBookForm onClick={mockCallBack} />
            </AuthorsProvider>
          </CategoriesProvider>
        </BooksProvider>
      );

      const cancelButton = screen.getByLabelText('closeAddBookForm');
      await userEvent.click(cancelButton);

      expect(mockCallBack).toHaveBeenCalledTimes(1);
    });
    it('should show alerts if non valid (blank) input', async () => {
      useAddBook.mockReturnValue({
        addBook: () => Promise.resolve({ data: true })
      });
      useAddAuthor.mockReturnValue({
        addAuthor: (fName, lName) =>
          Promise.resolve({
            data: {
              addAuthor: {
                id: '2',
                firstName: fName,
                lastName: lName
              }
            }
          })
      });
      useGetAuthors.mockReturnValue({
        authors: [{ id: '1', 'First Name': 'Will', 'Last Name': 'Smith' }]
      });

      render(
        <BooksProvider>
          <CategoriesProvider>
            <AuthorsProvider>
              <AddBookForm />
            </AuthorsProvider>
          </CategoriesProvider>
        </BooksProvider>
      );

      const submitButton = screen.getByLabelText('submitAddBookForm');

      expect(submitButton).toBeInTheDocument();

      await userEvent.click(submitButton);

      expect(await screen.findAllByRole('alert')).toHaveLength(4);
    });
    it('should add url input to the img component', async () => {
      useGetAuthors.mockReturnValue({
        authors: [{ id: '1', firstName: 'Will', lastName: 'Smith' }]
      });
      useAddAuthor.mockReturnValue({
        addAuthor: (fName, lName) =>
          Promise.resolve({
            data: {
              addAuthor: {
                id: '2',
                firstName: fName,
                lastName: lName
              }
            }
          })
      });
      render(
        <BooksProvider>
          <CategoriesProvider>
            <AuthorsProvider>
              <AddBookForm />
            </AuthorsProvider>
          </CategoriesProvider>
        </BooksProvider>
      );

      const url = screen.getByRole('textbox', { name: /url/i });
      expect(url).toBeInTheDocument();
      await userEvent.type(url, 'www.url');
      const imageElement = screen.getByAltText('Book Cover Image');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', ' www.url');
    });
  });

  describe('Submit Form tests', () => {
    describe('New Book Form', () => {
      beforeEach(() => {
        useAddAuthor.mockReturnValue({
          addAuthor: (fName, lName) =>
            Promise.resolve({
              data: {
                addAuthor: {
                  id: '2',
                  firstName: fName,
                  lastName: lName,
                  books: ['1']
                }
              }
            })
        });

        useGetAuthors.mockReturnValue({
          authors: [
            { id: '1', firstName: 'Will', lastName: 'Smith', books: ['1'] }
          ]
        });
      });
      it('should call addBook when form is submitted', async () => {
        const user = userEvent.setup();
        const addBookCallBack = useAddBook.mockReturnValue({
          addBook: () => Promise.resolve({ data: true })
        });

        render(
          <BooksProvider>
            <CategoriesProvider>
              <AuthorsProvider>
                <AddBookForm />
              </AuthorsProvider>
            </CategoriesProvider>
          </BooksProvider>
        );

        const title = screen.getByRole('textbox', { name: /title/i });
        expect(title).toBeInTheDocument();
        await user.type(title, 'hello');
        expect(title).toHaveValue('hello');

        const firstName = screen.getByRole('textbox', { name: /first name/i });
        await user.type(firstName, 'Will');
        expect(firstName).toHaveValue('Will');

        const lastName = screen.getByRole('textbox', { name: /last name/i });
        await user.type(lastName, 'Smith');
        expect(lastName).toHaveValue('Smith');

        const description = screen.getByRole('textbox', {
          name: /description/i
        });
        await user.type(description, 'Hello World');
        expect(description).toHaveValue('Hello World');

        const submitButton = screen.getByLabelText('submitAddBookForm');
        await user.click(submitButton);

        expect(addBookCallBack).toHaveBeenCalledTimes(1);
      });

      it('should add a book', async () => {
        const user = userEvent.setup();
        const addBookMock = useAddBook.mockReturnValue({
          addBook: () => Promise.resolve({ data: true })
        });

        render(
          <BooksProvider>
            <CategoriesProvider>
              <AuthorsProvider>
                <AddBookForm />
              </AuthorsProvider>
            </CategoriesProvider>
          </BooksProvider>
        );

        const title = screen.getByRole('textbox', { name: /title/i });
        expect(title).toBeInTheDocument();
        await user.type(title, 'hello');
        expect(title).toHaveValue('hello');

        const firstName = screen.getByRole('textbox', { name: /first name/i });
        await user.type(firstName, 'Will');
        expect(firstName).toHaveValue('Will');

        const lastName = screen.getByRole('textbox', { name: /last name/i });
        await user.type(lastName, 'Smith');
        expect(lastName).toHaveValue('Smith');

        const description = screen.getByRole('textbox', {
          name: /description/i
        });
        await user.type(description, 'Hello World');
        expect(description).toHaveValue('Hello World');

        const submitButton = screen.getByLabelText('submitAddBookForm');
        await user.click(submitButton);

        expect(addBookMock).toHaveBeenCalledTimes(1);
      });

      it('should upate Author', async () => {
        const user = userEvent.setup();
        const addBookMock = useAddBook.mockReturnValue({
          addBook: (title, id, url, category, description) =>
            Promise.resolve({ data: { addBook: { id: '1' } } })
        });

        const updateAuthorMock = useUpdateAuthor.mockReturnValue({
          updateAuthor: (id, firstName, lastName, books) =>
            Promise.resolve({
              data: {
                update: {
                  id: '1',
                  firstName: fName,
                  lastName: lName,
                  books: ['2']
                }
              }
            })
        });

        render(
          <BooksProvider>
            <CategoriesProvider>
              <AuthorsProvider>
                <AddBookForm />
              </AuthorsProvider>
            </CategoriesProvider>
          </BooksProvider>
        );

        const title = screen.getByRole('textbox', { name: /title/i });
        expect(title).toBeInTheDocument();
        await user.type(title, 'hello');
        expect(title).toHaveValue('hello');

        const firstName = screen.getByRole('textbox', { name: /first name/i });
        await user.type(firstName, 'Will');
        expect(firstName).toHaveValue('Will');

        const lastName = screen.getByRole('textbox', { name: /last name/i });
        await user.type(lastName, 'Smithy');
        expect(lastName).toHaveValue('Smithy');

        const description = screen.getByRole('textbox', {
          name: /description/i
        });
        await user.type(description, 'Hello World');
        expect(description).toHaveValue('Hello World');

        const submitButton = screen.getByLabelText('submitAddBookForm');
        await user.click(submitButton);

        expect(addBookMock).toHaveBeenCalledTimes(1);
        expect(updateAuthorMock).toHaveBeenCalledTimes(1);
      });

      it('should update category if category selected is not -1', async () => {
        const user = userEvent.setup();
        const addBookMock = useAddBook.mockReturnValue({
          addBook: (title, id, url, category, description) =>
            Promise.resolve({ data: { addBook: { id: '1' } } })
        });

        const updateCategory = useUpdateCategory.mockReturnValue({
          updateCategory: () => Promise.resolve({ data: true })
        });

        render(
          <BooksProvider>
            <CategoriesProvider>
              <AuthorsProvider>
                <AddBookForm />
              </AuthorsProvider>
            </CategoriesProvider>
          </BooksProvider>
        );
        debug();
        const title = screen.getByRole('textbox', { name: /title/i });
        expect(title).toBeInTheDocument();
        await user.type(title, 'hello');
        expect(title).toHaveValue('hello');

        const firstName = screen.getByRole('textbox', { name: /first name/i });
        await user.type(firstName, 'Will');
        expect(firstName).toHaveValue('Will');

        const lastName = screen.getByRole('textbox', { name: /last name/i });
        await user.type(lastName, 'Smith');
        expect(lastName).toHaveValue('Smith');

        const description = screen.getByRole('textbox', {
          name: /description/i
        });
        await user.type(description, 'Hello World');
        expect(description).toHaveValue('Hello World');

        const combobox = screen.getByRole('combobox');
        expect(combobox).toBeInTheDocument();

        user.selectOptions(combobox, ['1']);

        const submitButton = screen.getByLabelText('submitAddBookForm');
        await user.click(submitButton);

        expect(updateCategory).toHaveBeenCalledTimes(1);
      });
      it('should create an author if no previous author is found when new book is sumitted', async () => {
        const user = userEvent.setup();
        const addBookCallBack = useAddBook.mockReturnValue({
          addBook: (title, id, url, category, description) =>
            Promise.resolve({ data: { addBook: { id: '1' } } })
        });

        useAddAuthor.mockReturnValue({
          addAuthor: (fName, lName) => ({
            data: {
              addAuthor: {
                id: '2',
                firstName: fName,
                lastName: lName,
                books: ['1']
              }
            }
          })
        });

        useGetAuthors.mockReturnValue({
          authors: [
            { id: '2', firstName: 'Will', lastName: 'Smithers', books: ['1'] }
          ]
        });

        render(
          <BooksProvider>
            <CategoriesProvider>
              <AuthorsProvider>
                <AddBookForm />
              </AuthorsProvider>
            </CategoriesProvider>
          </BooksProvider>
        );

        const title = screen.getByRole('textbox', { name: /title/i });
        expect(title).toBeInTheDocument();
        await user.type(title, 'hello');
        expect(title).toHaveValue('hello');

        const firstName = screen.getByRole('textbox', { name: /first name/i });
        await user.type(firstName, 'Will');
        expect(firstName).toHaveValue('Will');

        const lastName = screen.getByRole('textbox', { name: /last name/i });
        await user.type(lastName, 'Smith');
        expect(lastName).toHaveValue('Smith');

        const description = screen.getByRole('textbox', {
          name: /description/i
        });
        await user.type(description, 'Hello World');
        expect(description).toHaveValue('Hello World');

        const submitButton = screen.getByLabelText('submitAddBookForm');
        await user.click(submitButton);

        expect(addBookCallBack).toHaveBeenCalledTimes(1);
      });
      it('should find an author that already exists when new book is submitted', async () => {
        const user = userEvent.setup();
        jest.clearAllMocks();

        const addBookCallBack = useAddBook.mockReturnValue({
          addBook: (title, id, url, category, description) =>
            Promise.resolve({ data: { addBook: { id: '1' } } })
        });

        useAddAuthor.mockReturnValue({
          addAuthor: (fName, lName) =>
            Promise.resolve({
              data: {
                addAuthor: {
                  id: '2',
                  firstName: fName,
                  lastName: lName,
                  books: ['1']
                }
              }
            })
        });
        useGetAuthors.mockReturnValue({
          authors: [
            { id: '1', firstName: 'Will', lastName: 'Smith', books: ['1'] }
          ]
        });

        render(
          <BooksProvider>
            <CategoriesProvider>
              <AuthorsProvider>
                <AddBookForm />
              </AuthorsProvider>
            </CategoriesProvider>
          </BooksProvider>
        );

        const title = screen.getByRole('textbox', { name: /title/i });
        expect(title).toBeInTheDocument();
        await user.type(title, 'hello');

        expect(title).toHaveValue('hello');

        const firstName = screen.getByRole('textbox', { name: /first name/i });
        await user.type(firstName, 'Will');

        expect(firstName).toHaveValue('Will');

        const lastName = screen.getByRole('textbox', { name: /last name/i });
        await user.type(lastName, 'Smith');

        expect(lastName).toHaveValue('Smith');

        const description = screen.getByRole('textbox', {
          name: /description/i
        });
        await user.type(description, 'Hello World');

        expect(description).toHaveValue('Hello World');

        const submitButton = screen.getByLabelText('submitAddBookForm');
        await user.click(submitButton);

        expect(addBookCallBack).toHaveBeenCalledTimes(1);
      });
    });
    describe('Edit Book Form', () => {
      beforeEach(() => {
        useAddAuthor.mockReturnValue({
          addAuthor: (fName, lName) =>
            Promise.resolve({
              data: {
                addAuthor: {
                  id: '2',
                  firstName: fName,
                  lastName: lName,
                  books: ['1']
                }
              }
            })
        });

        useGetAuthors.mockReturnValue({
          authors: [
            { id: '1', firstName: 'Will', lastName: 'Smith', books: ['1'] }
          ]
        });
      });

      it('should update a book', async () => {
        const user = userEvent.setup();
        const updateBookCallBack = useUpdateBook.mockReturnValue({
          updateBook: (
            id,
            title,
            authorId,
            categoryId,
            description,
            coverImage
          ) => Promise.resolve({ data: true })
        });

        render(
          <BooksProvider>
            <CategoriesProvider>
              <AuthorsProvider>
                <AddBookForm bookId={'1'} />
              </AuthorsProvider>
            </CategoriesProvider>
          </BooksProvider>
        );

        const title = screen.getByRole('textbox', { name: /title/i });
        expect(title).toBeInTheDocument();
        expect(title).toHaveValue('Hello');

        const firstName = screen.getByRole('textbox', { name: /first name/i });
        expect(firstName).toHaveValue('Jim');

        const lastName = screen.getByRole('textbox', { name: /last name/i });
        expect(lastName).toHaveValue('Bob');

        const description = screen.getByRole('textbox', {
          name: /description/i
        });
        expect(description).toHaveValue('Hello World');

        const submitButton = screen.getByLabelText('submitUpdateBookForm');
        await user.click(submitButton);
        expect(updateBookCallBack).toHaveBeenCalledTimes(1);
      });

      it('should update a category', async () => {
        const user = userEvent.setup();
        const updateCategory = useUpdateCategory.mockReturnValue({
          updateCategory: () => Promise.resolve({ data: true })
        });

        const updateBookCallBack = useUpdateBook.mockReturnValue({
          updateBook: () => Promise.resolve({ data: true })
        });

        useGetCategories.mockReturnValue({
          categories: [
            {
              id: '1',
              name: 'Fantasy',
              books: ['1']
            },
            {
              id: '2',
              name: 'Fiction',
              books: ['2', '3']
            }
          ]
        });

        useAddAuthor.mockReturnValue({
          addAuthor: (fName, lName) =>
            Promise.resolve({
              data: {
                addAuthor: {
                  id: '2',
                  firstName: fName,
                  lastName: lName,
                  books: ['1']
                }
              }
            })
        });

        useGetAuthors.mockReturnValue({
          authors: [
            { id: '1', firstName: 'Jim', lastName: 'Bob', books: ['1'] }
          ]
        });

        useGetBooks.mockReturnValue({
          books: [
            {
              id: '1',
              title: 'H',
              description: 'HDesc',
              category: '1',
              author: {
                id: '1',
                firstName: 'Jim',
                lastName: 'Bob',
                books: ['1']
              }
            }
          ]
        });

        render(
          <BooksProvider>
            <CategoriesProvider>
              <AuthorsProvider>
                <AddBookForm bookId={'1'} />
              </AuthorsProvider>
            </CategoriesProvider>
          </BooksProvider>
        );

        const title = screen.getByRole('textbox', { name: /title/i });
        expect(title).toBeInTheDocument();
        expect(title).toHaveValue('H');

        const firstName = screen.getByRole('textbox', { name: /first name/i });
        expect(firstName).toHaveValue('Jim');

        const lastName = screen.getByRole('textbox', { name: /last name/i });
        expect(lastName).toHaveValue('Bob');

        const description = screen.getByRole('textbox', {
          name: /description/i
        });
        expect(description).toHaveValue('HDesc');

        const combobox = screen.getByRole('combobox');
        expect(combobox).toBeInTheDocument();
        await user.click(combobox, { target: { value: 2 } });

        const submitButton = screen.getByLabelText('submitUpdateBookForm');
        await user.click(submitButton);

        expect(updateBookCallBack).toHaveBeenCalledTimes(1);
        expect(updateCategory).toHaveBeenCalledTimes(1);
      });
    });
  });
});
