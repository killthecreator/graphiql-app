import { createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';

interface SomeState {

}

const initialState: SomeState = {

};

export const dataSlice: Slice<SomeState, SliceCaseReducers<SomeState>, 'somename'> = createSlice({
  name: 'somename',
  initialState,
  reducers: {
    someReducer(state, action: PayloadAction<string>) {

    },
  },
});

export const { sortCards, setCards } = dataSlice.actions;
export default dataSlice.reducer;
