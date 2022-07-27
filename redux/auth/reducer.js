import Cookies from "js-cookie";
import * as types from "./types";

let initUser = null;

if (Cookies && Cookies.get && Cookies.get("user")) {
  initUser = JSON.parse(Cookies.get("user"));
}

const initialState = {
  user: initUser,
  isLoggedIn: false,
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.START_LOADING:
      return { ...state, isLoading: true };
    case types.END_LOADING:
      return { ...state, isLoading: false };
    case types.SIGN_UP:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case types.SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case types.LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case types.AUTH_ME:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};
