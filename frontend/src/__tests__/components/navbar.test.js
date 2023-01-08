import React from 'react';
import '@testing-library/jest-dom';
import { Navbar } from '../../../components';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});

describe('Navbar component tests', () => {
  const unselectedLink = `margin:auto 5px auto 5px; 
  display:inline-block; 
  color:black; 
  font-weight:400;`;

  const selectedLink = `margin:auto 5px auto 5px; 
  display:inline-block; 
  color:blue; 
  font-weight:bolder;`;

  describe('from the default books page', () => {
    beforeEach(() => {
      const url = 'http://localhost:3000/';
      Object.defineProperty(window, 'location', {
        value: new URL(url)
      });
    });

    it('should show the default navbar', async () => {
      render(<Navbar />);
      const authorsLink = screen.getByText(/Authors/i);
      const booksLink = screen.getByText(/Books/i);
      const categoriesLink = screen.getByText(/Categories/i);
      await waitFor(() => {
        expect(booksLink).toBeInTheDocument();
        expect(authorsLink).toBeInTheDocument();
        expect(categoriesLink).toBeInTheDocument();

        expect(booksLink).toHaveStyle(selectedLink);
        expect(authorsLink).toHaveStyle(unselectedLink);
        expect(categoriesLink).toHaveStyle(unselectedLink);
      });
    });

    it('should navigate to the Authors page visually', async () => {
      render(<Navbar />);
      const authorsLink = screen.getByText(/Authors/i);
      const booksLink = screen.getByText(/Books/i);
      const categoriesLink = screen.getByText(/Categories/i);
      await waitFor(() => {
        expect(categoriesLink).toBeInTheDocument();

        userEvent.click(authorsLink);

        expect(booksLink).toHaveStyle(unselectedLink);
        expect(authorsLink).toHaveStyle(selectedLink);
      });
    });

    it('should navigate to the Categories page visually', async () => {
      render(<Navbar />);
      const authorsLink = screen.getByText(/Authors/i);
      const booksLink = screen.getByText(/Books/i);
      const categoriesLink = screen.getByText(/Categories/i);
      await waitFor(() => {
        expect(authorsLink).toBeInTheDocument();

        userEvent.click(categoriesLink);

        expect(booksLink).toHaveStyle(unselectedLink);
        expect(categoriesLink).toHaveStyle(selectedLink);
      });
    });
  });

  describe('from the Authors  page', () => {
    beforeEach(() => {
      const url = 'http://localhost:3000/authors';
      Object.defineProperty(window, 'location', {
        value: new URL(url)
      });
    });

    it('should navigate to the Books page visually', async () => {
      render(<Navbar />);
      const authorsLink = screen.getByText(/Authors/i);
      const booksLink = screen.getByText(/Books/i);
      const categoriesLink = screen.getByText(/Categories/i);
      await waitFor(() => {
        expect(categoriesLink).toBeInTheDocument();

        userEvent.click(booksLink);

        expect(authorsLink).toHaveStyle(unselectedLink);
        expect(booksLink).toHaveStyle(selectedLink);
      });
    });

    it('should navigate to the Categories page visually', async () => {
      render(<Navbar />);
      const authorsLink = screen.getByText(/Authors/i);
      const booksLink = screen.getByText(/Books/i);
      const categoriesLink = screen.getByText(/Categories/i);
      await waitFor(() => {
        expect(booksLink).toBeInTheDocument();

        userEvent.click(categoriesLink);

        expect(authorsLink).toHaveStyle(unselectedLink);
        expect(categoriesLink).toHaveStyle(selectedLink);
      });
    });
  });

  describe('from the Categories  page', () => {
    beforeEach(() => {
      const url = 'http://localhost:3000/categories';
      Object.defineProperty(window, 'location', {
        value: new URL(url)
      });
    });

    it('should navigate to the Books page visually', async () => {
      render(<Navbar />);
      const authorsLink = screen.getByText(/Authors/i);
      const booksLink = screen.getByText(/Books/i);
      const categoriesLink = screen.getByText(/Categories/i);
      await waitFor(() => {
        expect(authorsLink).toBeInTheDocument();

        userEvent.click(booksLink);

        expect(categoriesLink).toHaveStyle(unselectedLink);
        expect(booksLink).toHaveStyle(selectedLink);
      });
    });

    it('should navigate to the Authors page visually', async () => {
      render(<Navbar />);
      const authorsLink = screen.getByText(/Authors/i);
      const booksLink = screen.getByText(/Books/i);
      const categoriesLink = screen.getByText(/Categories/i);
      await waitFor(() => {
        expect(booksLink).toBeInTheDocument();

        userEvent.click(authorsLink);

        expect(categoriesLink).toHaveStyle(unselectedLink);
        expect(authorsLink).toHaveStyle(selectedLink);
      });
    });
  });
});
