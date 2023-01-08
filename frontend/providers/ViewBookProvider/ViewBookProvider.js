import { useState } from 'react';
import ViewBookContext from '../ViewBookContext/ViewBookContext';

const ViewBookProvider = ({ children }) => {
  const [showViewBookModal, setShowViewBookModal] = useState(false); //Determines if ViewBook Modal is shown or not
  const [bookId, setBookId] = useState('0'); //Keeps track of selected book ID so the correct book can be loaded into the ViewBook Modal

  return (
    <ViewBookContext.Provider
      value={[showViewBookModal, setShowViewBookModal, bookId, setBookId]}
    >
      {children}
    </ViewBookContext.Provider>
  );
};

export default ViewBookProvider;
