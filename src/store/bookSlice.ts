import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import httpService from '../services/https.service';
import { BookType } from '../types/bookType';

type PayloadBookType = {
  totalItems: number;
  books: BookType[];
};

export interface iFetchParams {
  value: string;
  categoryName: string;
}

export interface iFetchMoreParams extends iFetchParams {
  startIndex: number;
}

export const fetchBooks = createAsyncThunk<PayloadBookType, iFetchParams>(
  'books/fetchByBooks',
  async (params) => {
    try {
      const { value, categoryName } = params;
      const category = categoryName === 'all' ? '' : `+subject:${categoryName}`;
      const { data } = await httpService.get(
        `volumes?q=${value}${category}&maxResults=30`,
      );

      return data;
    } catch (error) {
      console.log(error, 'error');
    }
  },
);

export const fetchBooksMore = createAsyncThunk<
  PayloadBookType,
  iFetchMoreParams
>('books/fetchByBooksMore', async (params) => {
  const { value, categoryName, startIndex } = params;
  const category = categoryName === 'all' ? '' : `+subject:${categoryName}`;
  const { data } = await httpService.get(
    `volumes?q=${value}${category}&maxResults=30&startIndex=${startIndex}`,
  );

  return data;
});
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface BookState {
  items: {
    totalItems: number;
    books: BookType[];
  };
  status: 'loading' | 'success' | 'error';
}

const initialState: BookState = {
  items: {
    totalItems: 0,
    books: [],
  },
  status: Status.LOADING,
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PayloadBookType>) {
      state.items = action.payload;
    },
    removeItems(state) {
      state.items.books = [];
      state.items.totalItems = 0;
      state.status = Status.LOADING;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = Status.LOADING;
      state.items.books = [];
      state.items.totalItems = 0;
    });

    builder.addCase(
      fetchBooks.fulfilled,
      (state, action: PayloadAction<PayloadBookType>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      },
    );

    builder.addCase(fetchBooks.rejected, (state) => {
      state.status = Status.ERROR;
      state.items.books = [];
      state.items.totalItems = 0;
    });
    builder.addCase(fetchBooksMore.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(
      fetchBooksMore.fulfilled,
      (state, action: PayloadAction<PayloadBookType>) => {
        state.items.books = [...state.items.books, ...action.payload.books];
        state.status = Status.SUCCESS;
      },
    );

    builder.addCase(fetchBooksMore.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setItems, removeItems } = bookSlice.actions;
export default bookSlice.reducer;
