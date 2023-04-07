import { configureStore } from '@reduxjs/toolkit';
import filter from './filterSlice';
import books from './bookSlice';

export const store = configureStore({
  reducer: {
    filter,
    books,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
