import { useMemo } from "react";
import postSlice from "./posts/postSlice";
import authSlice from "./auth/authSlice";
import profileSlice from "./profile/profileSlice";
import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./posts/postsApi";
let store;

const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      profile: profileSlice,
      all: postSlice,
      user: authSlice,
      [postsApi.reducerPath]: postsApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware),
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

export const withRedux = (getServerSideProps) => async (ctx) => {
  const store = initializeStore();
  const result = await getServerSideProps(ctx, store);

  return {
    ...result,

    props: {
      initialReduxState: store.getState(),
      ...result.props,
    },
  };
};
