import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mainUrl = 'https://graphqlpokemon.favware.tech/v7';

export const api = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({
    baseUrl: mainUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
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
