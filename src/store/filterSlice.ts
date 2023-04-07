import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchValue: string;
  categoryName: string;
}

const initialState: FilterState = {
  searchValue: '',
  categoryName: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryName(state, action: PayloadAction<string>) {
      state.categoryName = action.payload;
    },
  },
});

export const { setValue, setCategoryName } = filterSlice.actions;

export default filterSlice.reducer;
