import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '//we are choose api and add url',
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer auth key if needed should be here`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSome: builder.query({
      query: () => '/somequery',
    }),
  }),
});

export const { useGetSomeQuery } = api;
