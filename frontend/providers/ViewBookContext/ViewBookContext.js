import { createContext } from 'react';

const ViewBookContext = createContext({
  showViewBookModal: false,
  setShowViewBookModal: () => {},
  bookId: '0',
  setBookId: () => {}
});

export default ViewBookContext;
