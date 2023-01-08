import React, { useState, useContext } from 'react';
import {
  AddBookForm,
  Button,
  Card,
  Flex,
  Modal,
  Section,
  ViewBookPage
} from '../components';
import Link from 'next/link';
import Text from '../components/Text/Text';
import colors from '../theme/colors';
import { useGetBooks } from '../api/books';
import { BooksContext } from '../providers';
import ViewBookContext from '../providers/ViewBookContext';
/**
 * Main landing page of the application
 */
const Home = () => {
  /**
   * States
   */
  const [showAddBookModal, setAddBookModal] = useState(false); //Determines if AddBook Modal is shown or not
  const [showViewBookModal, setShowViewBookModal, bookId, setBookId] =
    useContext(ViewBookContext);

  const books = useContext(BooksContext);

  /**
   * Function which coverts loaded books data to JSX (Card Components)
   */
  const displayBooks = () => {
    return books.map(book => {
      //loop through all books
      return (
        //for each book return JSX of a Card Component
        <Card
          key={book.id}
          label={book.title}
          onClick={() => {
            setBookId(book.id);
            setShowViewBookModal(value => !value);
          }}
        >
          <Text
            bgColor={colors.mono[2]}
            fontSize={'1'}
            fontWeight={'900'}
            display={'block'}
          >
            <span>{book.title}</span>
          </Text>
          <Text
            bgColor={colors.mono[2]}
            fColor={colors.mono[colors.mono.length - 2]}
            fontSize={1}
            margin={'20px 0px'}
            display={'block'}
          >
            <span>{book.author.firstName + ' ' + book.author.lastName}</span>
          </Text>
        </Card>
      );
    });
  };

  /**
   * returns JSX
   */
  return (
    <Flex
      bgColor={colors.mono[1]}
      justifyContent={'space-between'}
      zIndex={'2'}
    >
      <Flex
        bgColor={colors.mono[1]}
        justifyContent={'space-between'}
        zIndex={'2'}
        margin={'20px 0px 20px 0px'}
      >
        <Text bgColor={colors.mono[1]} fontSize={1.5} margin={'auto 20px'}>
          My Library
        </Text>
        <Button
          label={'addBook'}
          onClick={() => setAddBookModal(true)}
          margin={'auto 10px'}
        >
          + Add Book
        </Button>
      </Flex>
      {books.length > 0 ? (
        <>
          <Flex
            justifyContent={'flex-start'}
            alignContent={'center'}
            bgColor={colors.mono[0]}
            wrap={'wrap'}
            zIndex={'0'}
            gap={'10px'}
            margin={'0px 20px 100px 20px'}
          >
            {displayBooks()}
          </Flex>
          <div style={{ height: '40px' }}></div>
        </>
      ) : (
        <Text>No Books Found...</Text>
      )}
      {showAddBookModal && (
        <Modal onClick={() => setAddBookModal(false)} title={'Add New Book'}>
          <AddBookForm onClick={() => setAddBookModal(false)} />
        </Modal>
      )}
      {showViewBookModal && (
        <Modal
          onClick={() => setShowViewBookModal(value => !value)}
          title={'Book Info'}
        >
          <ViewBookPage
            bookId={bookId}
            returnPath={'My Library'}
            onClick={() => setShowViewBookModal(value => !value)}
          />
        </Modal>
      )}
    </Flex>
  );
};

export default Home;
