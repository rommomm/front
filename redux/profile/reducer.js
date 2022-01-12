import * as types from "./types";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case types.USER_UPDATE_REQUEST:
      return { loading: true };
    case types.USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: payload, success: true };
    case types.USER_UPDATE_FAIL:
      return { loading: false, error: payload, success: false };
    default:
      return state;
  }
};
