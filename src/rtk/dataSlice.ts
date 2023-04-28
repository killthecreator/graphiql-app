import { ActionCreatorWithoutPayload, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';

interface DataState {
  isDay: boolean;
  editorText: string;
  responseText: string;
}

const initialState: DataState = {
  isDay: true,
  editorText: '',
  responseText: 'There will be a response'
};

export const dataSlice: Slice<DataState, SliceCaseReducers<DataState>, 'somename'> = createSlice({
  name: 'somename',
  initialState,
  reducers: {
    setIsDay(state, action: PayloadAction<boolean>) {
      state.isDay = action.payload;
      if (!state.isDay) document.body.classList.add('dark');
      if (state.isDay) document.body.classList.remove('dark');
    },
    setEditorText(state, action: PayloadAction<string>) {
      state.editorText = action.payload;
    },
    setResponseText(state, action: PayloadAction<string>) {
      console.log(action.payload);
      state.responseText = action.payload;

      console.log(state.responseText);
    },
  },
});

export const { setIsDay, setEditorText, setResponseText } = dataSlice.actions;
export default dataSlice.reducer;
