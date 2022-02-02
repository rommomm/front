import { useMemo } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./posts/postApi";
import { authApi } from "./auth/authApi";
import { commentsApi } from "./comments/commentsApi";
import { profileApi } from "./profile/profileApi";

let store;

const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      [postsApi.reducerPath]: postsApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [commentsApi.reducerPath]: commentsApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(postsApi.middleware)
        .concat(authApi.middleware)
        .concat(commentsApi.middleware)
        .concat(profileApi.middleware),
  });
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? createStore(preloadedState);
  if (preloadedState && store) {
    _store = createStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
