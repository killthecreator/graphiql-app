import { ActionCreatorWithoutPayload, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';

interface DataState {
  isSchema: boolean;
}

const initialState: DataState = {
  isSchema: false,
};

export const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setIsSchema(state, action: PayloadAction<boolean>) {
      state.isSchema = action.payload;
    },
  },
});

export const { setIsSchema } = schemaSlice.actions;
export default schemaSlice.reducer;
