import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const urlPrefix = process.env.REACT_APP_CORS;
const apiUrl = 'https://www.googleapis.com/youtube/v3'

const baseUrl = urlPrefix + encodeURIComponent(apiUrl);

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    getSearch: builder.query({
      query: () => ({url: '/search?key=AIzaSyBierevbRgqtzPkMdBU08qqJ7qRH_6EdZ4&q=anime trailer&maxResults=12&type=video&part=snippet&oredr=viewCount&regionCode=ua&'})
    })
  })
})