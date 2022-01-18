import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
import router from "next/router";
import { handleErrors } from "../../helpers/handleError";

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
  async function ({ values, setErrors }) {
    try {
      const response = await API.auth.signIn(values);
      Cookies.set("token", response.token);
      router.push("/");
      return response.data;
    } catch (error) {
      setErrors(handleErrors(error.errors));
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
    [signIn.pending]: (state) => {
      state.isLoggedIn = false;
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [signIn.rejected]: (state) => {
      state.isLoggedIn = false;
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
