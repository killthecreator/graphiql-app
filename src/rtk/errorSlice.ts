import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ErrorType = {
  errors: [
    {
        message: string;
        code: string;
    }
  ]
};

interface ErrorState {
  isError: boolean;
  error: ErrorType;
}

const initialState: ErrorState = {
  isError: false,
  error: {
    errors: [
      {
        message: "",
        code: "",
      },
    ],
  },
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setIsError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setError(state, action: PayloadAction<ErrorType>) {
      state.error = action.payload;
    },
  },
});

export const { setIsError, setError } = errorSlice.actions;
export default errorSlice.reducer;
