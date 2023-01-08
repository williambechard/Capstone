import React, { useContext, useState } from 'react';
import {
  Flex,
  Text,
  Modal,
  Button,
  Table,
  AddCategoryForm,
  ViewBookPage
} from '../components';
import colors from '../theme/colors';
import { ViewBookContext } from '../providers';
import CategoriesContext from '../providers/CategoriesContext/CategoriesContext';
import useHelperFunctions from '../hooks/useHelperFunctions';

const CategoriesPage = () => {
  const [showBooksInCategory, setShowBooksInCategory] = useState(false);
  const [targetCategory, setTargetCategory] = useState({});
  const [showAddCategoryModal, setAddCategoryModal] = useState(false); //Determines if AddBook Modal is shown or not

  const { compareText } = useHelperFunctions();

  const { categoriesLoading, categoriesError, categories } =
    useContext(CategoriesContext);
  const [showViewBookModal, setShowViewBookModal, bookId, setBookId] =
    useContext(ViewBookContext);

  const categoryClickHandler = e => {
    e.stopPropagation();
    let targetName = e.target.id?.split('_')[1];

    if (targetName != undefined) {
      const category = categories.find(
        cat => cat.name.toString() === targetName.toString()
      );

      if (category !== undefined) {
        setTargetCategory(category);
        setShowBooksInCategory(true);
      }
    }
  };

  //useMemo so that when data is refreshed the table isnt
  const columns = React.useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'name', //as we need the cell to contain JSX and still work with filter
        Cell: (
          { cell: { value } } //we have to modify the output of the cell value
        ) => (
          <Text
            clickable={true}
            onClick={categoryClickHandler}
            bgColor={'unset'}
            sort={value}
          >
            <a id={'category_' + value}>{value}</a>
          </Text>
        ),
        sortType: compareText // custom function
      },
      {
        Header: 'Number Of Books',
        accessor: 'books.length'
      }
    ],
    [categories, categoriesLoading] //needed b/c onClick
  );

  const bookDetailColumns = React.useMemo(
    () => [
      {
        Header: 'Book Title',
        accessor: 'title', // accessor is the "key" in the data
        Cell: (
          { cell: { value } } //we have to modify the output of the cell value
        ) => (
          <Text
            clickable={true}
            bgColor={'unset'}
            onClick={() => {
              setBookId(value.split('_')[1]);
              setShowViewBookModal(true);
            }}
          >
            {value.split('_')[0]}
          </Text>
        )
      },
      {
        Header: 'Author',
        accessor: 'author.name'
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: (
          { cell: { value } } //we have to modify the output of the cell value
        ) => <div style={{ height: '220px', overflow: 'auto' }}>{value}</div>
      }
    ],
    []
  );

  const data = React.useMemo(
    () =>
      Object.values(categories).map(cat => {
        return {
          ...cat,
          name: cat.name,
          books: cat.books
        };
      }),
    [categories, categoriesLoading]
  );

  const targetBookData = () => {
    return targetCategory.books.map(book => {
      return {
        ...book,
        description: book.description,
        author: {
          ...book.author,
          name: book.author.firstName + ' ' + book.author.lastName
        },
        title: book.title + '_' + book.id
      };
    });
  };

  return (
    <>
      {!categoriesLoading ? (
        <>
          {showBooksInCategory && (
            <div
              style={{
                backgroundColor: `${colors.mono[1]}`,
                marginTop: '.5rem'
              }}
            >
              <Text
                clickable={true}
                onClick={() => setShowBooksInCategory(false)}
                bgColor={colors.mono[1]}
                margin={'0px 0px 0px 1rem'}
                display={'inline-block'}
                fontSize={'0.75'}
              >
                <span>Categories</span>
              </Text>
              <Text
                display={'inline-block'}
                fontSize={'0.75'}
                bgColor={colors.mono[1]}
              >
                / Books In Category
              </Text>
            </div>
          )}
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
                {!showBooksInCategory
                  ? 'Categories'
                  : 'Books In Category: ' + targetCategory.name}
              </Text>
            </div>
            <div style={{ padding: '2rem 4rem' }}>
              <Button
                onClick={() => {
                  setAddCategoryModal(true);
                }}
                label={'Add Category'}
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
            <Table
              columns={showBooksInCategory ? bookDetailColumns : columns}
              data={showBooksInCategory ? targetBookData() : data}
            />
          </Flex>
          {showAddCategoryModal ? (
            <Modal
              onClick={() => setAddCategoryModal(false)}
              title={'Add New Category'}
            >
              <AddCategoryForm onClick={() => setAddCategoryModal(false)} />
            </Modal>
          ) : null}
          {showViewBookModal ? (
            <Modal
              onClick={() => setShowViewBookModal(false)}
              title={'Book Info'}
            >
              <ViewBookPage
                bookId={bookId}
                returnPath={'Categories / Books In Category '}
                onClick={() => setShowViewBookModal(false)}
              />
            </Modal>
          ) : null}
        </>
      ) : (
        <div>Categories Loading...</div>
      )}
    </>
  );
};

export default CategoriesPage;
