import { createSlice, current } from "@reduxjs/toolkit";
import { authApi } from "../auth/authApi";
import { userApi } from "./userApi";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.authMe.matchFulfilled,
      (state, { payload }) => {
        state.authUser = payload.data;
      }
    );
    builder.addMatcher(
      userApi.endpoints.followings.matchFulfilled,
      (state, { payload }) => {
        state.followings = payload.data;
      }
    );
    builder.addMatcher(
      userApi.endpoints.followers.matchFulfilled,
      (state, { payload }) => {
        state.followers = payload.data;
      }
    );
    builder.addMatcher(
      userApi.endpoints.follow.matchFulfilled,
      (state, { payload }) => {
        if (state.authUser) {
          state.followers = [current(state.authUser), ...state.followers];
        }
      }
    );
    builder.addMatcher(
      userApi.endpoints.unFollow.matchFulfilled,
      (state, { payload }) => {
        state.followers = state.followers.filter(
          (follower) => follower.id !== state.authUser.id
        );
      }
    );
  },
});

export default userSlice.reducer;
