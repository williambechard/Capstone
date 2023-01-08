import React from 'react';
import styled from '@emotion/styled';
import colors from '../../theme/colors';

/**
 * Styling based on button element
 */
const StyledButton = styled.button`
  ${props => `
  font-size:${props.fontSize};
  background-color:${props.bgColor};
  color:${props.fColor};
  border-color:${props.borderColor};
  margin:${props.margin};
  font-weight:${props.fontWeight};
 `}
  display: inline-block;
  padding: 5px 10px;
  border-radius: 10px;
  @media screen and (min-width: 300px) {
    padding: 5px 15px;
    font-size: ${props => props.fontSize / 1.5}rem;
  }
  @media screen and (min-width: 800px) {
    padding: 10px 20px;
    font-size: ${props => props.fontSize}rem;
  }
  &:hover {
    background-color: ${colors.mono[2]};
    cursor: pointer;
  }
`;

const Button = ({
  fontWeight = '400',
  label = 'Test',
  fontSize = '1',
  bgColor = colors.mono[0],
  fColor = colors.mono[colors.mono.length - 1],
  borderColor = colors.mono[colors.mono.length - 1],
  margin = 'unset',
  btnType = 'button',
  children,
  onClick
}) => {
  return (
    <StyledButton
      aria-label={label}
      type={btnType}
      onClick={onClick}
      margin={margin}
      borderColor={borderColor}
      fColor={fColor}
      bgColor={bgColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
