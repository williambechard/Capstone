import React, { useContext, useState } from 'react';
import { Flex, Card, Text, ViewBookPage, Modal } from '../components';
import colors from '../theme/colors';
import { ViewBookContext } from '../providers';
import AuthorsContext from '../providers/AuthorsContext';

const AuthorsPage = () => {
  const authors = useContext(AuthorsContext);

  const [showViewBookModal, setShowViewBookModal, bookId, setBookId] =
    useContext(ViewBookContext);

  const displayAuthors = () => {
    return authors.map(author => {
      return (
        <div key={author.id} style={{ width: '100%', margin: '20px' }}>
          <Text
            margin={'0px 0px 0px 20px'}
            bgColor={colors.mono[1]}
            fontSize={'2'}
          >
            {author.firstName + ' ' + author.lastName}
          </Text>
          <Flex height={'unset'} bgColor={colors.mono[0]}>
            {author.books?.map(item => {
              return (
                <Card
                  key={item.id}
                  label={item.title}
                  onClick={() => {
                    setBookId(item.id);
                    setShowViewBookModal(value => !value);
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
  };

  return (
    <>
      {authors?.length > 0 ? (
        <>
          <Flex
            justifyContent={'flex-start'}
            alignContent={'flex-start'}
            bgColor={colors.mono[1]}
            wrap={'wrap'}
            zIndex={'0'}
            margin={'20px 0px 20px 0px'}
            height={'100%'}
          >
            {displayAuthors()}
          </Flex>
          <div style={{ height: '40px' }}></div>
        </>
      ) : (
        <Text>
          <span>No Authors Found...</span>
        </Text>
      )}
      {showViewBookModal && (
        <Modal
          onClick={() => setShowViewBookModal(value => !value)}
          title={'Book Info'}
        >
          <ViewBookPage
            bookId={bookId}
            returnPath={'Authors'}
            onClick={() => setShowViewBookModal(value => !value)}
          />
        </Modal>
      )}
    </>
  );
};

export default AuthorsPage;
