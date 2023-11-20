import { configureStore } from "@reduxjs/toolkit";

import { malApi } from "../services/malApi";
import { newsApi } from "../services/newsApi";
import { youtubeApi } from "../services/youtubeApi";

export default configureStore({
  reducer: {
    [malApi.reducerPath]: malApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(malApi.middleware, newsApi.middleware, youtubeApi.middleware)
})