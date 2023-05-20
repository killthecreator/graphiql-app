import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SchemaType } from "~/graphql";

interface SchemaState {
  isSchema: boolean;
  schema: SchemaType | undefined;
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
    setSchema(state, action: PayloadAction<SchemaType>) {
      state.schema = action.payload;
    },
  },
});

export const { setIsSchema, setSchema } = schemaSlice.actions;
export default schemaSlice.reducer;
