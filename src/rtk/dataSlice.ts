import { ActionCreatorWithoutPayload, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';

interface DataState {
  editorText: string;
  responseText: string;
  variables: string;
}

const initialState: DataState = {
  editorText: '',
  responseText: 'There will be a response',
  variables: '{}',
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setEditorText(state, action: PayloadAction<string>) {
      state.editorText = action.payload;
    },
    setResponseText(state, action: PayloadAction<string>) {
      state.responseText = action.payload;
    },
    setVariables(state, action: PayloadAction<string>) {
      state.variables = action.payload;
    },
  },
});

export const { setEditorText, setResponseText, setVariables } = dataSlice.actions;
export default dataSlice.reducer;
