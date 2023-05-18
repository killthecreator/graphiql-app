import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultOperations, defaultVariables } from "~/consts";

export type Headers = {
  [key: string]: string;
};

interface DataState {
  editorText: string;
  responseText: string;
  variables: string;
  headers: Headers;
}

const initialState: DataState = {
  editorText: defaultOperations,
  responseText: "There will be a response",
  variables: defaultVariables,
  headers: {},
};

export const dataSlice = createSlice({
  name: "data",
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
    setHeaders(state, action: PayloadAction<Headers>) {
      state.headers = action.payload;
    },
  },
});

export const { setEditorText, setResponseText, setVariables, setHeaders } = dataSlice.actions;
export default dataSlice.reducer;
