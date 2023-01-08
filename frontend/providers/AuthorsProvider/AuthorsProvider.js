import React from 'react';
import { useGetAuthors } from '../../api/authors';
import AuthorsContext from '../AuthorsContext/AuthorsContext';

const AuthorsProvider = ({ children }) => {
  const { authors } = useGetAuthors();

  return (
    <AuthorsContext.Provider value={authors}>
      {children}
    </AuthorsContext.Provider>
  );
};

export default AuthorsProvider;
