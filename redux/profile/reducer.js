import * as types from "./types";

const initialState = {
  isLoading: false,
  profile: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.START_LOADING:
      return { ...state, isLoading: true };
    case types.END_LOADING:
      return { ...state, isLoading: false };
    case types.UPDATE_PROFILE:
      return { ...state, profile: payload };
    case types.UPLOAD_AVATAR:
      return { ...state, profile: payload };
    case types.REMOVE_AVATAR:
      return { ...state, profile: payload };
    case types.UPLOAD_BACKGROUND:
      return { ...state, profile: payload };
    case types.REMOVE_BACKGROUND:
      return { ...state, profile: payload };
    default:
      return state;
  }
};
