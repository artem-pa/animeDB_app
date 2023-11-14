import { configureStore } from "@reduxjs/toolkit";

import { malApi } from "../services/malApi";
import { newsApi } from "../services/newsApi";

export default configureStore({
  reducer: {
    [malApi.reducerPath]: malApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(malApi.middleware, newsApi.middleware)
})