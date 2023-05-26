import { configureStore } from "@reduxjs/toolkit";
import { api } from "./testApi";
import dataReducer from "~/rtk/dataSlice";
import themeReducer from "~/rtk/themeSlice";
import schemaReducer from "~/rtk/schemaSlice";
import errorReducer from "~/rtk/errorSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    data: dataReducer,
    theme: themeReducer,
    schema: schemaReducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
