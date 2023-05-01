import { ActionCreatorWithoutPayload, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';


interface ThemeState {
  isDay: boolean;
}

const initialState: ThemeState = {
  isDay: true,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsDay(state, action: PayloadAction<boolean>) {
      state.isDay = action.payload;
      if (!action.payload) document.body.classList.add('dark');
      if (action.payload) document.body.classList.remove('dark');
    },
  },
});

export const { setIsDay } = themeSlice.actions;
export default themeSlice.reducer;
