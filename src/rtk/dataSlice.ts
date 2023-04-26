import { ActionCreatorWithoutPayload, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';

interface DataState {
  isDay: boolean;
}

const initialState: DataState = {
  isDay: true,
};

export const dataSlice: Slice<DataState, SliceCaseReducers<DataState>, 'action'> = createSlice({
  name: 'action',
  initialState,
  reducers: {
    setIsDay(state, action: PayloadAction<boolean>) {
      state.isDay = action.payload;
      if (!state.isDay) document.body.classList.add('dark');
      if (state.isDay) document.body.classList.remove('dark');
    },
  },
});

export const { setIsDay } = dataSlice.actions;
export default dataSlice.reducer;
