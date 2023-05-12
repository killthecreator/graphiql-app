import { ActionCreatorWithoutPayload, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { GraphQLSchema } from 'graphql';

interface DataState {
  isSchema: boolean;
  schema: unknown;
}

const initialState: DataState = {
  isSchema: false,
  schema: undefined,
};

export const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setIsSchema(state, action: PayloadAction<boolean>) {
      state.isSchema = action.payload;
    },
    setSchema(state, action: PayloadAction<unknown>) {
      state.schema = action.payload;
    }
  },
});

export const { setIsSchema, setSchema } = schemaSlice.actions;
export default schemaSlice.reducer;
