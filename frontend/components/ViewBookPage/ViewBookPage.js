import React from 'react';

import { Text, Section, Flex, Button, Modal, AddBookForm } from '../index';
import { useGetBook } from '../../api/books';

/**
 * Component which is responsible for the inside of the Modal which shows the Book Info
 * @param bookId - Id of the book we want to view
 * @param onClick - function to be called when close is clicked
 * @returns {JSX.Element}
 */
const ViewBookPage = ({ bookId, onClick, returnPath }) => {
  //showEditForm
  /**
   * Hook for getting info from a book based on a bookId
   */
  const { bookLoading, bookError, book } = useGetBook(bookId);
  const [showEditBookModal, setShowEditBookModal] = React.useState(false); //Determines if EditBook Modal is shown or not

  const displayDescription = () => {
    return (
      <div
        style={{
          width: 'auto',
          marginLeft: `${book.coverImage != ' ' ? `20px` : `0px`}`
        }}
      >
        <Text margin={'0px  0px 2px 0px'} fontSize={'1.5'} fontWeight={'200'}>
          <h4 style={{ margin: 'unset' }}>Description</h4>
        </Text>
        <Text
          display={'block'}
          margin={'20px  0 10px 0'}
          fontSize={'1'}
          fontWeight={'400'}
          maxHeight={'25vh'}
          overflow={'auto'}
        >
          {book.description}
        </Text>
      </div>
    );
  };

  const createAuthorLine = () => {
    return (
      <>
        {book.author.firstName + ' ' + book.author.lastName}
        {book.category != null ? ' | Category: ' + book.category.name : ''}
      </>
    );
  };

  return (
    <Section height={'60vh'} width={'100%'}>
      {!bookLoading && !bookError ? (
        <Flex
          direction={'column'}
          justifyContent={'flex-start'}
          alignContent={'center'}
          width={'100%'}
        >
          <Flex
            direction={'row'}
            justifyContent={'flex-start'}
            alignContent={'flex-start'}
            warp={'wrap'}
            height={'1.25rem'}
          >
            <Text
              clickable={true}
              onClick={onClick}
              display={'inline-block'}
              fontSize={'0.75'}
            >
              <span>{returnPath}</span>
            </Text>
            <Text
              content={'/' + book.title}
              display={'inline-block'}
              aria-label={'return'}
              fontSize={'0.75'}
            >
              <span>/{book.title}</span>
            </Text>
          </Flex>
          <Text fontSize={'1.5'} fontWeight={'600'} margin={'20px 0 20px 0'}>
            <span>{book.title}</span>
            <Button
              margin={'0px 0px 0px 20px'}
              onClick={() => {
                setShowEditBookModal(true);
              }}
              label={'Edit'}
            >
              Edit
            </Button>
          </Text>
          <div style={{ width: '100%' }}>
            <Text fontSize={'1'} fontWeight={'200'}>
              <b>Author</b> : {createAuthorLine()}
            </Text>
          </div>
          {book.coverImage != ' ' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 10fr' }}>
              <img
                src={book.coverImage}
                style={{
                  width: '100px',
                  height: '150px',
                  margin: 'auto'
                }}
              />
              {displayDescription()}
            </div>
          ) : (
            <>{displayDescription()}</>
          )}
        </Flex>
      ) : (
        <Text>{'Loading...'}</Text>
      )}
      {showEditBookModal ? (
        <Modal
          onClick={() => {
            setShowEditBookModal(false);
          }}
          title={'Edit Book'}
        >
          <AddBookForm
            bookId={bookId}
            onClick={() => {
              setShowEditBookModal(false);
            }}
          />
        </Modal>
      ) : null}
    </Section>
  );
};

export default ViewBookPage;
