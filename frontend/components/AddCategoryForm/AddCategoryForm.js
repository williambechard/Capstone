import React from 'react';
import styled from '@emotion/styled';
import { Button, SingleLineInput, MultiLineInput, Flex } from '../index';
import { useForm } from 'react-hook-form';
import { useAddCategory } from '../../api/categories';
import useToast from '../../hooks/useToast';
import colors from '../../theme/colors';
import { CategoriesContext } from '../../providers';

/**
 * Style component based on a form
 */
const StyledForm = styled.form`
  width: 100%;
  height: 100%;
`;

const AddCategoryForm = ({ onClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { addCategory } = useAddCategory();

  const [, setToast] = useToast();

  const submitForm = async data => {
    const { name } = data;

    addCategory(name)
      .then(() => {
        setToast({
          type: 'success',
          message: 'The Category ' + name + ' was succesfully added'
        });
        //I want the form to close after submit, so make sure this happens
        onClick();
      })
      .catch(error => {
        setToast({
          type: 'error',
          message: 'The Category ' + name + 'FAILED to added. ERROR: ' + error
        });
      });
  };

  return (
    <StyledForm
      onSubmit={handleSubmit(submitForm)}
      ariaLabel={'form'}
      name={'form'}
    >
      <Flex
        direction={'column'}
        wrap={'nowrap'}
        justifyContent={'center'}
        borderRadius={'15px'}
      >
        <Flex
          direction={'column'}
          wrap={'nowrap'}
          justifyContent={'center'}
          borderRadius={'15px'}
        >
          <SingleLineInput
            labelText={'Category'}
            name={'name'}
            register={register}
            errors={errors}
            width={'100%'}
          />
        </Flex>
        <Flex
          justifyContent={'flex-end'}
          alignContent={'flex-end'}
          height={'50px'}
          padding={'30px 0px 0px 0px'}
          gap={'10px'}
        >
          <Button
            fColor={colors.bright[1]}
            borderColor={colors.bright[1]}
            label={'closeAddCategoryForm'}
            onClick={onClick}
          >
            Cancel
          </Button>
          <Button
            fColor={colors.bright[0]}
            borderColor={colors.bright[0]}
            label={'submitAddCategoryForm'}
            btnType={'submit'}
          >
            Add Category
          </Button>
        </Flex>
      </Flex>
    </StyledForm>
  );
};

export default AddCategoryForm;
