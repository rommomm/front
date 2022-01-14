import * as types from "./types";
import API from "../../api";

export const updateProfile = (values) => async (dispatch) => {
  try {
    const response = await API.profile.updateProfile({ values });
    dispatch({
      type: types.UPDATE_PROFILE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadAvatar = (avatar) => async (dispatch) => {
  try {
    const response = await API.posts.uploadAvatar({ avatar });
    dispatch({
      type: types.UPLOAD_AVATAR,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeAvatar = () => async (dispatch) => {
  try {
    const response = await API.posts.removeAvatar();
    dispatch({
      type: types.REMOVE_AVATAR,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadBackground = (background) => async (dispatch) => {
  try {
    const response = await API.posts.uploadBackground({ background });
    dispatch({
      type: types.UPLOAD_BACKGROUND,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeBackground = () => async (dispatch) => {
  try {
    const response = await API.posts.removeBackground();
    dispatch({
      type: types.REMOVE_BACKGROUND,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
