import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
import { message } from "antd";

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async function (values) {
    try {
      const response = await API.profile.updateProfile(values);
      message.success("Success", 2);
      return response.data;
    } catch (error) {
      message.error(error.message, 2);
      throw error;
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "profile/uploadAvatar",
  async function (avatar) {
    try {
      const response = await API.profile.uploadAvatar(avatar);
      message.success("Success", 2);
      return response.data;
    } catch (error) {
      message.error(error.message, 2);
      throw error;
    }
  }
);

export const uploadBackground = createAsyncThunk(
  "profile/uploadBackground",
  async function (background) {
    try {
      const response = await API.profile.uploadBackground(background);
      message.success("Success", 2);
      return response.data;
    } catch (error) {
      message.error(error.message, 2);
      throw error;
    }
  }
);

export const removeAvatar = createAsyncThunk(
  "profile/removeAvatar",
  async function () {
    try {
      const response = await API.profile.removeAvatar();
      message.success("Success", 2);
      return response.data;
    } catch (error) {
      message.error(error.message, 2);
      throw error;
    }
  }
);

export const removeBackground = createAsyncThunk(
  "profile/removeBackground",
  async function () {
    try {
      const response = await API.profile.removeBackground();
      message.success("Success", 2);
      return response.data;
    } catch (error) {
      message.error(error.message, 2);
      throw error;
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    isLoading: false,
  },
  extraReducers: {
    [updateProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
    [uploadBackground.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
    [removeAvatar.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
    [removeBackground.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export default profileSlice.reducer;
