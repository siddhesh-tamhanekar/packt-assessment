import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './components/Home/BooksSlice'
import modalReducer from './components/Home/ModalSlice'
export const store = configureStore({
  reducer: {
    'books': booksReducer,
    'modal': modalReducer
  },
})