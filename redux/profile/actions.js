import * as types from "./types";
import API from "../../api";
import { message } from "antd";

export const updateProfile = (values) => async (dispatch) => {
  try {
    const response = await API.profile.updateProfile(values);
    message.success("Success", 2);

    dispatch({
      type: types.UPDATE_PROFILE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    message.error(error.message, 2);
  }
};

export const uploadAvatar = (avatar) => async (dispatch) => {
  try {
    const response = await API.profile.uploadAvatar(avatar);
    message.success("Success", 2);
    dispatch({
      type: types.UPLOAD_AVATAR,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    message.error(error.message, 2);
  }
};

export const uploadBackground = (background) => async (dispatch) => {
  try {
    const response = await API.profile.uploadBackground(background);
    message.success("Success", 2);

    dispatch({
      type: types.UPLOAD_BACKGROUND,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    message.error(error.message, 2);
  }
};

export const removeAvatar = () => async (dispatch) => {
  try {
    const response = await API.profile.removeAvatar();
    message.success("Success", 2);
    dispatch({
      type: types.REMOVE_AVATAR,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeBackground = () => async (dispatch) => {
  try {
    const response = await API.profile.removeBackground();
    message.success("Success", 2);
    dispatch({
      type: types.REMOVE_BACKGROUND,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
