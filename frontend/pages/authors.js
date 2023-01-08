import React, { useContext, useState } from 'react';
import {
  Section,
  Flex,
  Card,
  Text,
  ViewBookPage,
  Modal,
  Button
} from '../components';
import colors from '../theme/colors';
import { BooksContext, ViewBookContext } from '../providers';
import triggerModal from '../helper/triggerModal';

const AuthorsPage = () => {
  const books = useContext(BooksContext);
  const [showViewBookModal, setShowViewBookModal, bookId, setBookId] =
    useContext(ViewBookContext);

  //loop over our books array and create an object with properties that groups
  // the authors books all together under a custom author key
  const convertBooksToAuthors = () => {
    let allAuthors = {};

    books.map(book => {
      //craft an id in the pattern authorid.firstName lastName
      //    I craft what will be the key this was as i can use split
      //    later to get what i want out of it
      let id =
        book.author.id +
        '-' +
        book.author.firstName +
        ' ' +
        book.author.lastName;
      //check if property/key already exists, if not create a blank array
      if (!allAuthors.hasOwnProperty(id)) allAuthors[id] = [];
      //now push the book onto the property that matches
      allAuthors[id].push(book);
    });

    return allAuthors;
  };

  //displays the books on the page. This method is crafted to show by Author and group their books together
  const displayBooks = () => {
    let jsx = [];

    //iterate over the object
    Object.entries(convertBooksToAuthors()).forEach(entry => {
      const [key, value] = entry;
      jsx.push(
        <div key={key.split('-')[0]} style={{ width: '100%', margin: '20px' }}>
          <Text
            margin={'0px 0px 0px 20px'}
            bgColor={colors.mono[1]}
            fontSize={'2'}
          >
            {key.split('-')[1]}
          </Text>
          <Flex height={'unset'} bgColor={colors.mono[1]}>
            {value.map(item => {
              return (
                <Card
                  key={item.id}
                  label={item.title}
                  onClick={() => {
                    setBookId(item.id);
                    triggerModal(setShowViewBookModal, showViewBookModal);
                  }}
                >
                  <Text
                    bgColor={colors.mono[2]}
                    fontSize={'1'}
                    fontWeight={'900'}
                    display={'block'}
                  >
                    <span>{item.title}</span>
                  </Text>
                </Card>
              );
            })}
          </Flex>
        </div>
      );
    });

    return jsx;
  };

  return (
    <>
      {books.length > 0 ? (
        <Flex
          justifyContent={'flex-start'}
          alignContent={'flex-start'}
          bgColor={colors.mono[1]}
          wrap={'wrap'}
          zIndex={'0'}
          margin={'20px 0px 20px 0px'}
          height={'100%'}
        >
          {displayBooks()}
        </Flex>
      ) : (
        <Text>
          <span>No Books Found...</span>
        </Text>
      )}
      {showViewBookModal && (
        <Modal
          onClick={() => triggerModal(setShowViewBookModal, showViewBookModal)}
          title={'Book Info'}
        >
          <ViewBookPage
            bookId={bookId}
            returnPath={'Authors'}
            onClick={() =>
              triggerModal(setShowViewBookModal, showViewBookModal)
            }
          />
        </Modal>
      )}
    </>
  );
};

export default AuthorsPage;
