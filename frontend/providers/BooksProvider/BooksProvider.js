import React from 'react';
import { useGetBooks } from '../../api/books';
import BooksContext from '../BooksContext/BooksContext';

const BooksProvider = ({ children }) => {
  const { books } = useGetBooks();

  return (
    <BooksContext.Provider value={books}>{children}</BooksContext.Provider>
  );
};

export default BooksProvider;
