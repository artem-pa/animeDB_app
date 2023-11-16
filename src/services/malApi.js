import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const malApiHeaders = {
  'X-MAL-CLIENT-ID': process.env.REACT_APP_MAL_CLIENT_ID
}

const urlPrefix = process.env.REACT_APP_CORS;
const apiUrl = process.env.REACT_APP_MAL_API_URL

const baseUrl = urlPrefix + encodeURIComponent(apiUrl);
// const baseUrl = 'https://cors-anywhere.herokuapp.com/' + 'api.myanimelist.net/v2';

const fields = {
  short: 'fields=title,start_date,end_date,mean,num_episodes,num_volumes,num_list_users,media_type,status,synopsis',
  full: 'fields=title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics, num_volumes,num_chapters,authors{first_name,last_name},pictures,serialization{name, url}'
}

const createReq = url => ({ url, headers: malApiHeaders });

export const malApi = createApi({
  reducerPath: 'malApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getAnimeRanking: builder.query({
      query: ({pageType, topType, limit}) => createReq(`/${pageType}/ranking?ranking_type=${topType}&limit=${limit ?? 20}&${fields.short}`)
    }),
    getAnimeSeason: builder.query({
      query: ({year, season, limit}) => createReq(`/anime/season/${year}/${season}?limit=${limit ?? 20}&${fields.short}`)
    }),
    getAnimeSearch: builder.query({
      query: ({pageType, query, limit}) => createReq(`/${pageType}?q=${query}&limit=${limit ?? 20}&${fields.short}`)
    }),
    getMangaSearch: builder.query({
      query: (query) => !query ? null : createReq(`/manga?q=${query}&limit=5&${fields.short}`)
    }),
    getAnimeInfo: builder.query({
      query: ({type, itemId}) => createReq(`/${type}/${itemId}?${fields.full}`)
    }),
    getAnimeListFullUrl: builder.query({
      query: (fullUrl) => createReq(fullUrl.replace(apiUrl, ''))
    })
  })
})

export const { useGetAnimeRankingQuery, useGetAnimeSearchQuery, useLazyGetAnimeSearchQuery,useGetMangaSearchQuery, useGetAnimeInfoQuery, useLazyGetAnimeListFullUrlQuery, useGetAnimeSeasonQuery } = malApi;