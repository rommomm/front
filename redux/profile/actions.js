import * as types from "./types";
import Cookies from "js-cookie";
import API from "../../api";

export const updateProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const response = await API.profile.updateInfo(user);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signUp = (credentials, callback) => async (dispatch) => {
  try {
    const response = await API.auth.signUp(credentials);
    dispatch({
      type: types.SIGN_UP,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};
