import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Query } from '@favware/graphql-pokemon';

interface GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> {
  data: Record<K, Omit<Query[K], '__typename'>>;
}

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
          query: payload
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const { useGraphqlMutation } = api;
