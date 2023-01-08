import React from 'react';
import { Text, Section, Flex } from '../index';
import { useGetBook } from '../../api/books';

/**
 * Component which is responsible for the inside of the Modal which shows the Book Info
 * @param bookId - Id of the book we want to view
 * @param onClick - function to be called when close is clicked
 * @returns {JSX.Element}
 */
const ViewBookPage = ({ bookId, onClick }) => {
  /**
   * Hook for getting info from a book based on a bookId
   */
  const { bookLoading, bookError, book } = useGetBook(bookId);

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
              <span>My Library </span>
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
          </Text>
          <Text fontSize={'1'} fontWeight={'100'} margin={'10px  0 10px 0'}>
            <span>{book.author.firstName + ' ' + book.author.lastName}</span>
          </Text>
          <Text margin={'10px  0 10px 0'} fontSize={'1.15'} fontWeight={'200'}>
            <span>Description</span>
          </Text>
          <Text
            margin={'20px  0 10px 0'}
            fontSize={'1'}
            fontWeight={'400'}
            maxHeight={'35vh'}
            overflow={'auto'}
          >
            {book.description}
          </Text>
        </Flex>
      ) : (
        <Text content={'Loading...'} />
      )}
    </Section>
  );
};

export default ViewBookPage;
