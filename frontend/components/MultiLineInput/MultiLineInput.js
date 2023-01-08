import React from 'react';
import styled from '@emotion/styled';
import Text from '../Text/Text';
import colors from '../../theme/colors';

/**
 * Style component based on a textarea
 */
const StyledInput = styled.textarea`
  width: inherit;
  resize: ${props => props.resize};
  font-size: 1rem;
  border-radius: 6px;
  color: ${colors.mono[colors.mono.length - 1]};
  border: 1px solid ${colors.mono[4]};
  padding-left: 0.5rem;
  box-sizing: border-box;
`;

const StyledAlert = styled.span`
  color: ${colors.bright[1]};
  font-family: Poppins;
`;

/**
 * Style component based on a label element
 * Styling used for the label part of the input element
 */
const StyledLabel = styled.label`
  width: inherit;
`;

const MultiLineInput = ({
  register,
  labelText = 'Label',
  name = 'test',
  errors,
  rows,
  resize = 'none'
}) => {
  return (
    <StyledLabel>
      <label htmlFor={name}>
        <Text
          fontSize={1}
          fontWeight={'1000'}
          fColor={
            errors?.[name]
              ? colors.bright[1]
              : colors.mono[colors.mono.length - 1]
          }
        >
          <span>{labelText}</span>
        </Text>
      </label>
      <StyledInput
        type={'text'}
        aria-label={name}
        id={name}
        title={name}
        rows={rows}
        resize={resize}
        name={name}
        aria-invalid={errors?.[name] ? 'true' : 'false'}
        {...register(name, {
          required: 'Required',
          minLength: 1,
          maxLength: 800
        })}
      />
      {errors?.[name] && errors?.[name].type === 'required' && (
        <StyledAlert role={'alert'}>Input is Required</StyledAlert>
      )}
      {errors?.[name] && errors?.[name].type === 'maxLength' && (
        <StyledAlert role={'alert'}>Max length exceeded</StyledAlert>
      )}
    </StyledLabel>
  );
};

export default MultiLineInput;
