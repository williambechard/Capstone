import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import Text from '../Text/Text';
import colors from '../../theme/colors';
import { stringifyForDisplay } from '@apollo/client/utilities';

/**
 * Style component based on the input element
 */
const StyledInput = styled.input`
  ${props => `
  color: ${colors.mono[colors.mono.length - 1]};
  font-size: 1rem;
  height: 2rem;
  border-radius: 6px;
  border: 1px solid ${colors.mono[4]};
  padding-left: 0.5rem;
  width: ${props.width};
  box-sizing: border-box;
`};
`;

const StyledAlert = styled.div`
  color: ${colors.bright[1]};
  font-family: Poppins;
`;

/**
 * Style component based on a div element
 * Styling for label part of the input
 */
const StyledDiv = styled.div`
  ${props => `width: ${props.width};`};
`;

const SingleLineInput = ({
  labelText = 'Label',
  name = 'test',
  errors,
  register,
  width = '100%',
  bgColor = 'white',
  value = ''
}) => {
  const [input, setInput] = useState('');

  useMemo(() => {
    setInput(value);
  }, []);

  return (
    <StyledDiv bgColor={bgColor} width={width}>
      <label style={{ display: 'block' }} htmlFor={name}>
        <Text
          bgColor={bgColor}
          fontWeight={'1000'}
          fontSize={'1'}
          fColor={
            errors?.[name]
              ? colors.bright[1]
              : colors.mono[colors.mono.length - 1]
          }
        >
          {labelText}
        </Text>
      </label>
      <StyledInput
        type={'text'}
        name={name}
        title={name}
        id={name}
        width={'100%'}
        aria-invalid={errors?.[name] ? 'true' : 'false'}
        {...register(name, {
          required: 'Required',
          minLength: 1,
          maxLength: 110
        })}
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      {errors?.[name] && errors?.[name].type === 'required' && (
        <StyledAlert role={'alert'}>Input is Required</StyledAlert>
      )}
      {errors?.[name] && errors?.[name].type === 'maxLength' && (
        <StyledAlert role={'alert'}>Max length exceeded</StyledAlert>
      )}
    </StyledDiv>
  );
};

export default SingleLineInput;
