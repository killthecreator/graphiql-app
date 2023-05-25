import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainUrl = 'https://graphqlpokemon.favware.tech/v7';

const data = {};

const fakeFetch = Promise.resolve({
  status: 200,
  body: JSON.stringify({ data }),
});

export const api = createApi({
  reducerPath: 'myApi',
  baseQuery: () => Promise.resolve({ data }),
  endpoints: (builder) => ({
    graphql: builder.mutation({
      query: (payload) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({
          query: payload.query,
          variables: payload.variables,
        }),
        headers: payload.headers,
      }),
    }),
  }),
});

export const { useGraphqlMutation } = api;
