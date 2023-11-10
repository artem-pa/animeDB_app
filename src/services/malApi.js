import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const malApiHeaders = {
  'X-MAL-CLIENT-ID': process.env.REACT_APP_MAL_CLIENT_ID
}

const baseUrl = process.env.REACT_APP_CORS + encodeURIComponent(process.env.REACT_APP_MAL_API_URL);
// const baseUrl = 'https://corsproxy.io/?' + encodeURIComponent(process.env.REACT_APP_MAL_API_URL);

const createReq = url => ({ url, headers: malApiHeaders });

export const malApi = createApi({
  reducerPath: 'malApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getAnimeRanking: builder.query({
      query: (type) => createReq(`/anime/ranking?ranking_type=${type}&limit=5`)
    }),
    getAnimeSearch: builder.query({
      query: (query) => createReq(`/anime?q=${query}&limit=5&fields=title,id,start_date,end_date,mean,media_type,status`)
    }),
    getMangaSearch: builder.query({
      query: (query) => createReq(`/manga?q=${query}&limit=5&fields=title,id,start_date,end_date,mean,media_type,status`)
    }),
  })
})

export const { useGetAnimeRankingQuery, useGetAnimeSearchQuery, useGetMangaSearchQuery } = malApi;