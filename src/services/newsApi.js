import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_NEWS_API_URL;

const apiHeaders = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': process.env.REACT_APP_NEWS_API_KEY,
  'X-RapidAPI-Host': 'newsnow.p.rapidapi.com'
}

const from_date = new Date(Date.now() - 5e9).toLocaleString('en-UK').slice(0, 10);
const to_date = new Date(Date.now()).toLocaleString('en-UK').slice(0, 10);

const createReq = (query, page) => ({ url: baseUrl, headers: apiHeaders, method: 'POST', body: { query, page, time_bounded: false, from_date, to_date, category: 'anime' } });

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getNews: builder.query({
      query: (query, page = 1) => createReq(query, page)
    })
  })
})

export const { useGetNewsQuery } = newsApi;