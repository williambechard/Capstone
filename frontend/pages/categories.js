import React, { useContext, useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Modal,
  Button,
  Table,
  AddCategoryForm
} from '../components';
import colors from '../theme/colors';
import { BooksContext } from '../providers';
import triggerModal from '../helper/triggerModal';
import CategoriesContext from '../providers/CategoriesContext/CategoriesContext';

const CategoriesPage = () => {
  const [showAddCategoryModal, setAddCategoryModal] = useState(false); //Determines if AddBook Modal is shown or not
  const books = useContext(BooksContext);
  const { categoriesLoading, categoriesError, categories } =
    useContext(CategoriesContext);
  //useMemo so that when data is refreshed the table isnt, unless the data has actually
  // changed
  const columns = React.useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'name' // accessor is the "key" in the data
      },
      {
        Header: 'Number Of Books',
        accessor: 'books.length'
      }
    ],
    []
  );

  const data = React.useMemo(
    () => Object.values(categories),
    [categories, books, categoriesLoading]
  );

  console.log('categories ', categories);
  return (
    <>
      {!categoriesLoading ? (
        <>
          <Flex
            justifyContent={'space-between'}
            alignContent={'center'}
            bgColor={colors.mono[1]}
            wrap={'wrap'}
            zIndex={'0'}
            margin={'20px 0px 20px 0px'}
          >
            <div style={{ padding: '2rem 4rem' }}>
              <Text bgColor={colors.mono[1]} fontSize={'2'}>
                Categories
              </Text>
            </div>
            <div style={{ padding: '2rem 4rem' }}>
              <Button
                onClick={() =>
                  triggerModal(setAddCategoryModal, showAddCategoryModal)
                }
              >
                + Add Category
              </Button>
            </div>
          </Flex>
          <Flex
            justifyContent={'center'}
            alignContent={'center'}
            bgColor={colors.mono[1]}
            wrap={'wrap'}
            zIndex={'0'}
            height={'100%'}
          >
            <Table columns={columns} data={data ?? {}} />
          </Flex>
          {showAddCategoryModal && (
            <Modal
              onClick={() =>
                triggerModal(setAddCategoryModal, showAddCategoryModal)
              }
              title={'Add New Category'}
            >
              <AddCategoryForm
                onClick={() =>
                  triggerModal(setAddCategoryModal, showAddCategoryModal)
                }
              />
            </Modal>
          )}
        </>
      ) : (
        <div>Categories Loading...</div>
      )}
    </>
  );
};

export default CategoriesPage;
