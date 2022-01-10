import * as types from "./types";
import Cookies from "js-cookie";
import API from "../../api";

export const authMe = () => async (dispatch) => {
  try {
    dispatch({ type: types.START_LOADING });

    const response = await API.profile.get();
    Cookies.set("user", JSON.stringify(response.data));

    dispatch({
      type: types.AUTH_ME,
      payload: response.data,
    });
    dispatch({ type: types.END_LOADING });
  } catch (error) {
    throw error;
  }
};

export const signIn = (credentials, callback) => async (dispatch) => {
  try {
    const response = await API.auth.signIn(credentials);
    Cookies.set("token", response.token);

    dispatch({
      type: types.SIGN_IN,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const login = (credentials, callback) => async (dispatch) => {
  try {
    await dispatch(signIn(credentials));
    await dispatch(authMe());
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const register = (credentials, callback) => async (dispatch) => {
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

export const logout = () => async (dispatch) => {
  try {
    const response = await API.auth.signOut();
    Cookies.remove("token");
    Cookies.remove("user");
    dispatch({
      type: types.LOGOUT,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
