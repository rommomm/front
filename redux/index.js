import { useMemo } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import posts from "./posts/reducer";
import auth from "./auth/reducer";
import API from "../api";

let store;

const reducers = combineReducers({
  posts,
  auth,
});

function initStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);
  if (preloadedState && store) {
    _store = initStore({
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
