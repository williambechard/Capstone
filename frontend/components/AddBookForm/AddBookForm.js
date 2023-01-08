import React, { useContext, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  SingleLineInput,
  MultiLineInput,
  Flex,
  SelectDropDown
} from '../index';
import { useForm } from 'react-hook-form';
import { useAddBook, useUpdateBook } from '../../api/books';
import {
  updateAuthorMutation,
  useAddAuthor,
  useGetAuthors,
  useUpdateAuthor
} from '../../api/authors';
import { useUpdateCategory } from '../../api/categories';
import useToast from '../../hooks/useToast';
import colors from '../../theme/colors';
import { BooksContext, CategoriesContext } from '../../providers';

/**
 * Style component based on a form
 */
const StyledForm = styled.form`
  width: 100%;
  height: 100%;
`;

const AddBookForm = ({ onClick, bookId = '-1' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { categories } = useContext(CategoriesContext);
  const books = useContext(BooksContext);
  const { updateCategory } = useUpdateCategory();
  const { updateAuthor } = useUpdateAuthor();
  const { addBook } = useAddBook();
  const { updateBook } = useUpdateBook();
  const { addAuthor } = useAddAuthor();
  const { authors } = useGetAuthors();
  const [, setToast] = useToast();
  const selectedCategory = useRef();

  let targetTitle = '';
  let targetFirstName = '';
  let targetLastName = '';
  let targetDescription = '';
  let targetCat = '';
  let targetCoverImage = ' ';
  let targetBook = undefined;
  if (bookId != '-1') {
    targetBook = books.find(book => book.id == bookId);
    if (targetBook !== undefined) {
      targetTitle = targetBook.title;
      targetFirstName = targetBook.author.firstName;
      targetLastName = targetBook.author.lastName;
      targetDescription = targetBook.description ?? '';
      targetCat = targetBook.category != null ? targetBook.category.id : '-1';
      targetCoverImage = targetBook.coverImage;
    }
  }

  const [inputValue, setInputValue] = useState(targetCoverImage);

  const findAuthor = (fName, lName) => {
    return authors.find(
      author => author.firstName === fName && author.lastName === lName
    );
  };

  const submitForm = async data => {
    //destructure the date from the form
    const { fName, lName, title, description, category, url } = data;

    //find author and assign to targetAurthor if they exist
    //  otherwise we create the author and add its data to the
    //  targetAuthor const
    const targetAuthor =
      findAuthor(fName, lName) ??
      (await (
        await addAuthor(fName, lName)
      ).data.addAuthor);

    //We call either AddBook or UpdateBook depending on if this is a new book or not
    //  we can determine this based on if bookId is a valid bookId
    if (targetBook !== undefined) {
      //Update
      //This book already has a category assigned
      // if it is null assign it a value of -1 for the current category
      const oldCat =
        books.find(book => book.id === bookId).category?.id ?? '-1';

      //did author change?
      if (targetBook.author.id != targetAuthor.id) {
        //update the old author
        await updateAuthor(
          targetBook.author.id,
          targetBook.author.firstName,
          targetBook.author.lastName,
          targetBook.author.books
            ?.filter(b => b.id != targetBook.id)
            .map(b => b.id) ?? []
        );
        //let authBooks = targetAuthor.books.map(b => b.id).concat([targetBook.id]);
        //authBooks.push(targetBook.id);

        //update the new author
        await updateAuthor(
          targetAuthor.id,
          targetAuthor.firstName,
          targetAuthor.lastName,
          targetAuthor.books.map(b => b.id).concat([targetBook.id])
        );
      }
      //update
      updateBook(bookId, title, targetAuthor.id, category, description, url)
        .then(() => {
          //only update category if the category changed to a different category
          if (oldCat != category)
            updateCategory(oldCat, category, '', bookId)
              .then(() => {
                setToast({
                  type: 'success',
                  message: 'The Book was succesfully updated'
                });
                onClick();
              })
              .catch(err => console.log(err));
          else {
            //otherwise no category update needed, so show toast and force click to exit modal
            setToast({
              type: 'success',
              messsage: 'The Book ' + title + ' was succesfully ' + 'updated'
            });
            onClick();
          }
        })
        .catch(error => {
          setToast({
            type: 'error',
            message: 'The Book ' + title + ' was not updated. Error: ' + error
          });
        });
    } else {
      addBook(title, targetAuthor.id, url, category, description)
        .then(async book => {
          //update auther to add this new book
          //update the new author
          await updateAuthor(
            targetAuthor.id,
            targetAuthor.firstName,
            targetAuthor.lastName,
            targetAuthor.books.map(b => b.id).concat([book.data.addBook.id])
          );

          //only update Category if it is a valid category selected
          if (category != '-1')
            //only need to update current category, so -1 is passed for old category
            updateCategory('-1', category, '', book.data?.addBook.id)
              .then(() => {
                setToast({
                  type: 'success',
                  message: 'The Book was succesfully updated'
                });
                onClick();
              })
              .catch(err => console.log(err));
          else {
            //otherwise no category update needed
            setToast({
              type: 'success',
              message:
                'The Book ' + title + ' was succesfully added to the Library'
            });
            onClick(); //force click event to close this modal
          }
        })
        .catch(error => {
          setToast({
            type: 'error',
            message:
              'The Book ' +
              title +
              ' was not added to the Library. Error: ' +
              error
          });
        });
    }
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
          value={targetTitle}
        />
        <Flex
          direction={'row'}
          justifyContent={'flex-start'}
          wrap={'nowrap'}
          gap={'10px'}
          height={'unset'}
          margin={'4px 0px 0px 0px'}
        >
          <SingleLineInput
            labelText={'First Name'}
            name={'fName'}
            register={register}
            errors={errors}
            value={targetFirstName}
          />
          <SingleLineInput
            labelText={'Last Name'}
            name={'lName'}
            register={register}
            errors={errors}
            value={targetLastName}
          />
        </Flex>
        <SingleLineInput
          labelText={'Cover Image URL'}
          name={'url'}
          register={register}
          value={targetCoverImage}
          inputState={value => {
            setInputValue(value);
          }}
        />
        <SelectDropDown
          labelText={'Category'}
          name={'category'}
          register={register}
          options={
            categories.length > 0
              ? categories.map(cat => ({
                  name: cat.name,
                  id: cat.id
                }))
              : []
          }
          selectRef={selectedCategory}
          value={targetCat}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 10fr' }}>
          <img
            src={inputValue}
            alt={'Book Cover Image'}
            style={{ width: '100px', height: '200px' }}
          />
          <div style={{ width: 'auto', marginLeft: '20px' }}>
            <MultiLineInput
              labelText={'Description'}
              name={'description'}
              rows={5}
              register={register}
              errors={errors}
              value={targetDescription}
            />
          </div>
        </div>
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
            label={bookId != '-1' ? 'closeUpdateBookForm' : 'closeAddBookForm'}
            onClick={onClick}
          >
            Cancel
          </Button>
          <Button
            fColor={colors.bright[0]}
            borderColor={colors.bright[0]}
            label={
              bookId != '-1' ? 'submitUpdateBookForm' : 'submitAddBookForm'
            }
            btnType={'submit'}
          >
            {bookId != '-1' ? 'Update Book' : 'Add Book'}
          </Button>
        </Flex>
      </Flex>
    </StyledForm>
  );
};

export default AddBookForm;
