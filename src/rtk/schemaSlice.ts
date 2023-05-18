import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SchemaState {
  isSchema: boolean;
  schema: unknown;
}

const initialState: SchemaState = {
  isSchema: false,
  schema: undefined,
};

export const schemaSlice = createSlice({
  name: "schema",
  initialState,
  reducers: {
    setIsSchema(state, action: PayloadAction<boolean>) {
      state.isSchema = action.payload;
    },
    setSchema(state, action: PayloadAction<unknown>) {
      state.schema = action.payload;
    },
  },
});

export const { setIsSchema, setSchema } = schemaSlice.actions;
export default schemaSlice.reducer;
