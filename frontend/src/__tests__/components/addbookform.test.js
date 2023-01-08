import '@testing-library/jest-dom';
import { render, screen, waitFor, logRoles } from '@testing-library/react';
import AddBookForm from '../../../components/AddBookForm';
import { useAddBook } from '../../../api/books';
import { useAddAuthor, useGetAuthors } from '../../../api/authors';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  jest.resetAllMocks();
});

jest.mock('../../../api/books');
jest.mock('../../../api/authors');

describe('AddBookForm Component Tests', () => {
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

    render(<AddBookForm />);

    const addBookFormComponent = screen.getByRole('form');
    expect(addBookFormComponent).toBeInTheDocument();
    expect(addBookFormComponent).toHaveStyle('width: 100%', 'height: 100%');
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

    render(<AddBookForm onClick={mockCallBack} />);

    const cancelButton = screen.getByLabelText('closeAddBookForm');
    await userEvent.click(cancelButton);

    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
  it('alerts should display if non valid (blank) input', async () => {
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

    render(<AddBookForm />);

    const submitButton = screen.getByLabelText('submitAddBookForm');

    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);

    expect(await screen.findAllByRole('alert')).toHaveLength(4);
  });
  it('should call addBook when form is submitted', async () => {
    const addBookCallBack = useAddBook.mockReturnValue({
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
      authors: [{ id: '1', firstName: 'Will', lastName: 'Smith' }]
    });

    render(<AddBookForm />);

    const title = screen.getByRole('textbox', { name: /title/i });
    expect(title).toBeInTheDocument();
    await userEvent.type(title, 'hello');
    expect(title).toHaveValue('hello');

    const firstName = screen.getByRole('textbox', { name: /first_name/i });
    await userEvent.type(firstName, 'Will');
    expect(firstName).toHaveValue('Will');

    const lastName = screen.getByRole('textbox', { name: /last_name/i });
    await userEvent.type(lastName, 'Smith');
    expect(lastName).toHaveValue('Smith');

    const description = screen.getByRole('textbox', { name: /description/i });
    await userEvent.type(description, 'Hello World');
    expect(description).toHaveValue('Hello World');

    const submitButton = screen.getByLabelText('submitAddBookForm');
    await userEvent.click(submitButton);

    expect(addBookCallBack).toHaveBeenCalledTimes(1);
  });
  it('should create an author if no previous author is found when new book is sumitted', async () => {
    const addBookCallBack = useAddBook.mockReturnValue({
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
      authors: [{ id: '2', firstName: 'Will', lastName: 'Smithers' }]
    });

    render(<AddBookForm />);

    const title = screen.getByRole('textbox', { name: /title/i });
    expect(title).toBeInTheDocument();
    await userEvent.type(title, 'hello');
    expect(title).toHaveValue('hello');

    const firstName = screen.getByRole('textbox', { name: /first_name/i });
    await userEvent.type(firstName, 'Will');
    expect(firstName).toHaveValue('Will');

    const lastName = screen.getByRole('textbox', { name: /last_name/i });
    await userEvent.type(lastName, 'Smith');
    expect(lastName).toHaveValue('Smith');

    const description = screen.getByRole('textbox', { name: /description/i });
    await userEvent.type(description, 'Hello World');
    expect(description).toHaveValue('Hello World');

    const submitButton = screen.getByLabelText('submitAddBookForm');
    await userEvent.click(submitButton);

    expect(addBookCallBack).toHaveBeenCalledTimes(1);
  });
  it('should find an author that already exists when new book is submitted', async () => {
    jest.clearAllMocks();

    const addBookCallBack = useAddBook.mockReturnValue({
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
      authors: [{ id: '1', firstName: 'Will', lastName: 'Smith' }]
    });

    render(<AddBookForm />);

    const title = screen.getByRole('textbox', { name: /title/i });
    expect(title).toBeInTheDocument();
    await userEvent.type(title, 'hello');

    expect(title).toHaveValue('hello');

    const firstName = screen.getByRole('textbox', { name: /first_name/i });
    await userEvent.type(firstName, 'Will');

    expect(firstName).toHaveValue('Will');

    const lastName = screen.getByRole('textbox', { name: /last_name/i });
    await userEvent.type(lastName, 'Smith');

    expect(lastName).toHaveValue('Smith');

    const description = screen.getByRole('textbox', { name: /description/i });
    await userEvent.type(description, 'Hello World');

    expect(description).toHaveValue('Hello World');

    const submitButton = screen.getByLabelText('submitAddBookForm');
    await userEvent.click(submitButton);

    expect(addBookCallBack).toHaveBeenCalledTimes(1);
  });
});
