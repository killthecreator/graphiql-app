import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import dataReducer from './dataSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
