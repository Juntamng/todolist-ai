import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  value: string;
}

const initialState: FilterState = {
  value: 'all'
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer; 