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
    isLoading: true,
  },
  extraReducers: {
    [updateProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    [uploadAvatar.pending]: (state, action) => {
      state.isLoading = true;
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    [uploadBackground.pending]: (state, action) => {
      state.isLoading = true;
    },
    [uploadBackground.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    [removeAvatar.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeAvatar.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
    [removeBackground.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeBackground.fulfilled]: (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    },
  },
});

export default profileSlice.reducer;
