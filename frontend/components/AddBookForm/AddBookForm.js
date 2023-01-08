import React from 'react';
import styled from '@emotion/styled';
import { Button, SingleLineInput, MultiLineInput, Flex } from '../index';
import { useForm } from 'react-hook-form';
import { useAddBook } from '../../api/books';
import { useAddAuthor, useGetAuthors } from '../../api/authors';
import useToast from '../../hooks/useToast';
import convertSpaces from '../../helper/convertSpaces';
import colors from '../../theme/colors';

/**
 * Style component based on a form
 */
const StyledForm = styled.form`
  width: 100%;
  height: 100%;
`;

const AddBookForm = ({ onClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { addBook } = useAddBook();
  const { addAuthor } = useAddAuthor();
  const { authors } = useGetAuthors();
  const [, setToast] = useToast();

  const findAuthor = (fName, lName) => {
    return authors.find(
      author => author.firstName === fName && author.lastName === lName
    );
  };

  const submitForm = async data => {
    const { fName, lName, title, description } = data;

    const targetAuthor =
      findAuthor(fName, lName) ??
      (await addAuthor(fName, lName).catch(err => false)).data.addAuthor;

    addBook(title, targetAuthor.id, '', [''], description)
      .then(() => {
        setToast({
          type: 'success',
          message: 'The Book ' + title + ' was succesfully added to the Library'
        });
        //I want the form to close after submit, so make sure this happens
        onClick();
      })
      .catch(error => {
        setToast({
          type: 'error',
          message:
            'The Book ' +
            title +
            'FAILED to added to the Library. ERROR: ' +
            error
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
        <SingleLineInput
          labelText={'Title'}
          name={'title'}
          register={register}
          errors={errors}
          width={'100%'}
        />
        <Flex
          direction={'row'}
          justifyContent={'flex-start'}
          wrap={'nowrap'}
          gap={'10px'}
        >
          <SingleLineInput
            labelText={'First Name'}
            name={'fName'}
            register={register}
            errors={errors}
          />
          <SingleLineInput
            labelText={'Last Name'}
            register={register}
            name={'lName'}
            errors={errors}
          />
        </Flex>
        <Flex
          height={'200px'}
          direction={'column'}
          justifyContent={'flex-end'}
          alignContent={'flex-end'}
        >
          <MultiLineInput
            labelText={'Description'}
            name={'description'}
            rows={5}
            register={register}
            errors={errors}
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
            label={'closeAddBookForm'}
            onClick={onClick}
          >
            Cancel
          </Button>
          <Button
            fColor={colors.bright[0]}
            borderColor={colors.bright[0]}
            label={'submitAddBookForm'}
            btnType={'submit'}
          >
            Add Book
          </Button>
        </Flex>
      </Flex>
    </StyledForm>
  );
};

export default AddBookForm;
