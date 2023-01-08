import React from 'react';
import styled from '@emotion/styled';
import colors from '../../theme/colors';

/**
 * Style component based on a div element
 */
const TextItem = styled.div`
  ${props => `
  display: ${props.display};
  font-size: ${props.fontSize / 1.5}rem;
  background-color: ${props.bgColor};
  color: ${props.fColor};
  font-weight: ${props.fontWeight};
  margin:${props.margin};
  overflow: ${props.overflow};
  max-height: ${props.maxHeight}; 
  @media screen and (min-width: 300px) {
    font-size: ${props.fontSize / 1.25}rem;
  }
  @media screen and (min-width: 800px) {
    font-size: ${props.fontSize}rem;
  }
  `}
  ${props =>
    props.clickable &&
    `
    cursor: pointer;
     &:hover {
        text-decoration:underline;
        color:${colors.bright[2]};
        text-weight:bold
      }
  `}
  text-align: left;
  font-family: Poppins, serif;
`;

const Text = React.forwardRef(
  (
    {
      display = 'inline-block',
      fontSize = '1',
      bgColor = colors.mono[0],
      fColor = colors.mono[colors.mono.length - 1],
      fontWeight = '400',
      margin = '0',
      overflow = 'hidden',
      maxHeight = '40vh',
      clickable = false,
      onClick,
      children
    },
    ref
  ) => {
    return (
      <TextItem
        display={display}
        fontSize={fontSize}
        bgColor={bgColor}
        fColor={fColor}
        fontWeight={fontWeight}
        margin={margin}
        overflow={overflow}
        maxHeight={maxHeight}
        clickable={clickable}
        onClick={onClick}
      >
        {children}
      </TextItem>
    );
  }
);

export default Text;
