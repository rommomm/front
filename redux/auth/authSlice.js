import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
import router from "next/router";

export const authMe = createAsyncThunk("auth/authMe", async function () {
  try {
    const response = await API.profile.get();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const signIn = createAsyncThunk(
  "auth/signIn",
  async function (credentials) {
    try {
      const response = await API.auth.signIn(credentials);
      Cookies.set("token", response.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async function (credentials) {
    try {
      await dispatch(signIn(credentials));
      await dispatch(authMe());
    } catch (error) {
      throw error;
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async function (credentials) {
    try {
      const response = await API.auth.signUp(credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async function () {
  try {
    await API.auth.signOut();
    Cookies.remove("token");
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    isLoggedIn: false,
  },
  extraReducers: {
    [authMe.pending]: (state) => {
      state.isLoading = true;
    },
    [authMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [signIn]: (state) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [signUp]: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
