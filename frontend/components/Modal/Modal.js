import React from 'react';
import styled from '@emotion/styled';
import { Button, Section, Text, Flex } from '../index';
import { createPortal } from 'react-dom';
import colors from '../../theme/colors';

/**
 * Style component based on a div element
 * Styling for the background of the modal
 */
const StyledBG = styled.div`
  position: fixed;
  z-index: 13;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

/**
 * Style component based on a div element
 * Styling for the modal panel itself
 */
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  max-width: 100%;
  max-height: 100%;
  z-index: 14;
  background-color: white;
  border-radius: 15px;
`;

const Modal = ({ children, title = 'Test Modal', onClick }) => {
  return createPortal(
    <StyledBG>
      <StyledModal aria-modal={true}>
        <Section
          borderRadius={'15px 15px 15px 15px'}
          templateRows={'auto'}
          height={'unset'}
          margin={'15px'}
        >
          <Flex
            bgColor={colors.mono[0]}
            justifyContent={'space-between'}
            borderRadius={'15px 15px 0px 0px'}
            height={'75px'}
          >
            <Text
              bgColor={colors.mono[0]}
              fontSize={'2'}
              fontWeight={'1000'}
              margin={'auto 25px auto 0px'}
            >
              <span>{title}</span>
            </Text>
            <Button
              margin={'auto 10px'}
              label={'closeModal'}
              onClick={onClick}
              fontWeight={'1000'}
            >
              X
            </Button>
          </Flex>
          <Flex bgColor={colors.mono[0]} borderRadius={'0 0 15px 15px'}>
            {children}
          </Flex>
        </Section>
      </StyledModal>
    </StyledBG>,
    document.querySelector('#ModalArea')
  );
};

export default Modal;
