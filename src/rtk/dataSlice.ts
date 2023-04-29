import { ActionCreatorWithoutPayload, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';

type Headers = {
  [key: string]: string,
};

interface DataState {
  isDay: boolean;
  editorText: string;
  responseText: string;
  variables: string;
  headers: Headers;
}

const initialState: DataState = {
  isDay: true,
  editorText: '',
  responseText: 'There will be a response',
  variables: '{}',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
};

export const dataSlice = createSlice({
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
      state.responseText = action.payload;
    },
    setVariables(state, action: PayloadAction<string>) {
      state.variables = action.payload;
    },
    setHeaders(state, action: PayloadAction<string>) {
      try{
        const parsed = JSON.parse(action.payload);
        state.headers = parsed;
      } catch (e) {
      }
    }
  },
});

export const { setIsDay, setEditorText, setResponseText, setVariables, setHeaders } = dataSlice.actions;
export default dataSlice.reducer;
