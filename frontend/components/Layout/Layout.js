import React from 'react';
import Head from 'next/head';
import { Section, Flex, Text, Navbar } from '../';
import DULogo from '../../public/DU-Logo-Mark.svg';
import Image from 'next/image';
import colors from '../../theme/colors';

const Layout = ({ children }) => {
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
      <Flex
        zIndex={'4'}
        justifyContent={'flex-start'}
        alignContent={'flex-start'}
        height={'auto'}
        wrap={'wrap'}
        position={'sticky'}
        top={'0'}
        left={'0'}
      >
        <div style={{ margin: '10px', display: 'inline-block' }}>
          <Image src={DULogo} alt={'DULogo'} width={'50px'} height={'50px'} />
        </div>
        <Text fontSize={'1.70'} fontWeight={'1000'} margin={'auto 10px'}>
          William's Capstone
        </Text>
        <Navbar />
      </Flex>
      {children}
      <Flex
        bgColor={colors.mono[colors.mono.length - 1]}
        justifyContent={'center'}
        height={'30px'}
        position={'fixed'}
        bottom={'0'}
        zIndex={4}
      >
        <Text
          bgColor={colors.mono[colors.mono.length - 1]}
          fColor={colors.mono[0]}
          fontSize={1}
          margin={'auto 10px'}
        >
          @ 2022 Omni Federal - All Rights Reserved
        </Text>
      </Flex>
    </>
  );
};

export default Layout;
