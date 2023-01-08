import React, { useMemo, useState } from 'react';
import { useGetCategories } from '../../api/categories';
import CategoriesContext from '../CategoriesContext/CategoriesContext';

const CategoriesProvider = ({ children }) => {
  const { categoriesLoading, categoriesError, categories } = useGetCategories();

  return (
    <CategoriesContext.Provider
      value={{ categoriesLoading, categoriesError, categories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
