import React, { useState, useEffect } from 'react';
import { Text, Flex, colors } from '../';
import Link from 'next/link';

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState('/');

  useEffect(() => {
    setCurrentPage(window.location.pathname);
  }, []);

  return (
    <Flex width={'unset'} height={'unset'} direction={'row'}>
      <Link href="/">
        <Text
          clickable={true}
          margin={'auto 5px auto 5px'}
          onClick={() => setCurrentPage('/')}
          display={'inline-block'}
          fontSize={'1'}
          fColor={currentPage === '/' ? 'blue' : 'black'}
          fontWeight={currentPage === '/' ? 'bolder' : '400'}
        >
          Books
        </Text>
      </Link>
      <Link href="/authors">
        <Text
          clickable={true}
          margin={'auto 5px auto 5px'}
          onClick={() => setCurrentPage('/authors')}
          display={'inline-block'}
          fontSize={'1'}
          fColor={currentPage === '/authors' ? 'blue' : 'black'}
          fontWeight={currentPage === '/authors' ? 'bolder' : '400'}
        >
          Authors
        </Text>
      </Link>
      <Link href="/categories">
        <Text
          clickable={true}
          margin={'auto 5px auto 5px'}
          onClick={() => setCurrentPage('/categories')}
          display={'inline-block'}
          fontSize={'1'}
          fColor={currentPage === '/categories' ? 'blue' : 'black'}
          fontWeight={currentPage === '/categories' ? 'bolder' : '400'}
        >
          Categories
        </Text>
      </Link>
    </Flex>
  );
};

export default Navbar;
