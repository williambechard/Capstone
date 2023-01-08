import React, { useRef } from 'react';
import styled from '@emotion/styled';
import colors from '../../theme/colors';
import Text from '../../components/Text';

/**
 * Style component based on a div element
 */
const StyledSelect = styled.select`
  ${props =>
    `
    color: ${colors.mono[colors.mono.length - 1]};
    font-size: 1rem;
    height: 2rem;
    border-radius: 6px;
    border: 1px solid ${colors.mono[4]};
    padding-left: 0.5rem;
    width: ${props.width};
    box-sizing: border-box;
  `}
  display: grid;
`;

/**
 * Style component based on a div element
 * Styling for label part of the input
 */
const StyledDiv = styled.div`
  margin: 8px 0px 20px 0px;
  ${props => `width: ${props.width};  `}
`;

const SelectDropDown = ({
  labelText = 'Label',
  name = 'test',
  width = '100%',
  bgColor = 'white',
  selectRef,
  register,
  value = '-1',
  options = []
}) => {
  return (
    <StyledDiv bgColor={bgColor} width={width}>
      <label style={{ display: 'block' }} htmlFor={name}>
        <Text
          bgColor={bgColor}
          fontWeight={'1000'}
          fontSize={'1'}
          fColor={colors.mono[colors.mono.length - 1]}
        >
          {labelText}
        </Text>
      </label>
      <StyledSelect
        name={name}
        title={name}
        id={name}
        width={width}
        ref={selectRef}
        defaultValue={value}
        {...register(name)}
      >
        <option key={-1} value={-1}></option>
        {options.map(opt => {
          return (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          );
        })}
      </StyledSelect>
    </StyledDiv>
  );
};
export default SelectDropDown;
