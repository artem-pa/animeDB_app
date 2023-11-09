import { configureStore } from "@reduxjs/toolkit";

import { malApi } from "../services/malApi";

export default configureStore({
  reducer: {
    [malApi.reducerPath]: malApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(malApi.middleware)
})