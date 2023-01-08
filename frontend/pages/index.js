import React, { useState } from 'react';
import Head from 'next/head';
import {
  AddBookForm,
  Button,
  Card,
  Flex,
  Modal,
  Section,
  ViewBookPage
} from '../components';
import DULogo from '../public/DU-Logo-Mark.svg';
import Text from '../components/Text/Text';
import Image from 'next/image';
import { useGetBooks } from '../api/books';
import colors from '../theme/colors';

/**
 * Main landing page of the application
 */
const Home = () => {
  /**
   * States
   */
  const [showAddBookModal, setAddBookModal] = useState(false); //Determines if AddBook Modal is shown or not
  const [showViewBookModal, setShowViewBookModal] = useState(false); //Determines if ViewBook Modal is shown or not
  const [bookId, setBookId] = useState('0'); //Keeps track of selected book ID so the correct book can be loaded into the ViewBook Modal

  /**
   * Hook for query to get all books, so that they can be displayed on the page
   * allBooksQueryBasic is a gql query which is crafted to only pull the data we want for the books
   */
  const { books } = useGetBooks();

  //weird lint error saying modalValue not used, but it is in the function...
  /**
   * Function for showing a modal.
   * Uses passed parameters so that ANY Modal state
   * can be set, and therefor shown with this function.
   * @param setModal -The Function which sets the State's value
   * @param modalValue -The current value of the state
   */
  const triggerModal = (setModal, modalValue) => {
    setModal(modalValue => !modalValue); //uses arrow function to make sure current value is used and not stale data
  };

  /**
   * Function for setting the bookId state to the currently selected book
   * Called from the Card's onClick event
   * also Opens the ViewBook Modal, by settings its state
   * @param id - the id of the currently selected book
   */
  const showBook = id => {
    setBookId(id); //set the bookId state to the current book id
    setShowViewBookModal(visibleStatus => !visibleStatus); //set the viewBook modal state to the opposite, therefor showing the modal
  };

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
          onClick={() => showBook(book.id)}
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
    <>
      <Head>
        <title>DU Capstone</title>
        <meta
          name="description"
          content="Capstone project for Digital University Dev Team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section bgColor={colors.mono[1]} height={'100%'}>
        <Flex
          position={'fixed'}
          top={'0'}
          left={'0'}
          zIndex={'2'}
          justifyContent={'flex-start'}
          alignContent={'flex-start'}
          gap={'15px'}
          height={'70px'}
          wrap={'wrap'}
        >
          <div style={{ margin: '10px', display: 'inline-block' }}>
            <Image src={DULogo} alt={'DULogo'} width={'50px'} height={'50px'} />
          </div>
          <Text
            fontSize={'1.70'}
            fontWeight={'1000'}
            margin={'auto 10px'}
            height={'100%'}
          >
            <span>William's Capstone</span>
          </Text>
        </Flex>
        <Section height={'100vh'} bgColor={colors.mono[1]}>
          <Flex
            bgColor={colors.mono[1]}
            justifyContent={'space-between'}
            position={'fixed'}
            top={'70px'}
            left={'0'}
            zIndex={'2'}
            height={'70px'}
          >
            <Text bgColor={colors.mono[1]} fontSize={1.5} margin={'auto 20px'}>
              <span>My Library</span>
            </Text>
            <Button
              label={'addBook'}
              onClick={() => triggerModal(setAddBookModal, showAddBookModal)}
              margin={'auto 10px'}
            >
              + Add Book
            </Button>
          </Flex>
          {books.length > 0 ? (
            <Flex
              justifyContent={'flex-start'}
              alignContent={'center'}
              bgColor={colors.mono[1]}
              wrap={'wrap'}
              zIndex={'0'}
              transform={'TranslateY(150px)'}
            >
              {displayBooks()}
            </Flex>
          ) : (
            <Text>
              <span>No Books Found...</span>
            </Text>
          )}
          {showAddBookModal && (
            <Modal
              onClick={() => triggerModal(setAddBookModal, showAddBookModal)}
              title={'Add New Book'}
            >
              <AddBookForm
                onClick={() => triggerModal(setAddBookModal, showAddBookModal)}
              />
            </Modal>
          )}
          {showViewBookModal && (
            <Modal
              onClick={() =>
                triggerModal(setShowViewBookModal, showViewBookModal)
              }
              title={'Book Info'}
            >
              <ViewBookPage
                bookId={bookId}
                onClick={() =>
                  triggerModal(setShowViewBookModal, showViewBookModal)
                }
              />
            </Modal>
          )}
        </Section>
        <Flex
          bgColor={colors.mono[colors.mono.length - 1]}
          justifyContent={'center'}
          height={'30px'}
          position={'fixed'}
          bottom={'0'}
        >
          <Text
            bgColor={colors.mono[colors.mono.length - 1]}
            fColor={colors.mono[0]}
            fontSize={1}
            margin={'auto 10px'}
          >
            <span>@ 2022 Omni Federal - All Rights Reserved</span>
          </Text>
        </Flex>
      </Section>
    </>
  );
};

export default Home;
