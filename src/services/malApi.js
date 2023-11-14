import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const malApiHeaders = {
  'X-MAL-CLIENT-ID': process.env.REACT_APP_MAL_CLIENT_ID
}

const baseUrl = process.env.REACT_APP_CORS + encodeURIComponent(process.env.REACT_APP_MAL_API_URL);
// const baseUrl = 'https://cors-anywhere.herokuapp.com/' + 'api.myanimelist.net/v2';

const createReq = url => ({ url, headers: malApiHeaders });

export const malApi = createApi({
  reducerPath: 'malApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getAnimeRanking: builder.query({
      query: (type) => createReq(`/anime/ranking?ranking_type=${type}&limit=5`)
    }),
    getAnimeSearch: builder.query({
      query: (query) => !query ? null : createReq(`/anime?q=${query}&limit=5&fields=title,id,start_date,end_date,mean,media_type,status`)
    }),
    getMangaSearch: builder.query({
      query: (query) => !query ? null : createReq(`/manga?q=${query}&limit=5&fields=title,id,start_date,end_date,mean,media_type,status`),
    }),
    getAnimeInfo: builder.query({
      query: ({type, itemId}) => createReq(`/${type}/${itemId}?fields=title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics, num_volumes,num_chapters,authors{first_name,last_name},pictures,serialization{name, url}`),
    }),
    getMangaInfo: builder.query({
      query: (id) => createReq(`/manga/${id}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_volumes,num_chapters,authors{first_name,last_name},pictures,background,related_anime,related_manga,recommendations,serialization{name, url},statistics `),
    }),
  })
})

export const { useGetAnimeRankingQuery, useGetAnimeSearchQuery, useLazyGetAnimeSearchQuery,useGetMangaSearchQuery, useGetAnimeInfoQuery, useGetMangaInfoQuery, useLazyGetAnimeInfoQuery } = malApi;