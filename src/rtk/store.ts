import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import dataReducer from './dataSlice';
import themeReducer from './themeSlice';
import schemaReducer from './schemaSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    data: dataReducer,
    theme: themeReducer,
    schema: schemaReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
