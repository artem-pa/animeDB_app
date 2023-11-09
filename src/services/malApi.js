import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const malApiHeaders = {
  'X-MAL-CLIENT-ID': process.env.REACT_APP_MAL_CLIENT_ID
}

const baseUrl = 'http://alloworigin.com/get?url=' + 'https://api.chucknorris.io/jokes/random';

const createReq = url => ({ url, headers: malApiHeaders });

export const malApi = createApi({
  reducerPath: 'malApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getAnimeRanking: builder.query({
      query: (type) => createReq(`/anime/ranking?ranking_type=${type}&limit=5`)
    }),
    getAnimeSearch: builder.query({
      query: (query) => createReq(`/anime?q=${query}&limit=5`)
    })
  })
})

export const { useGetAnimeRankingQuery, useGetAnimeSearchQuery } = malApi;