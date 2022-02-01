import React from "react";
import UserHeader from "../UserHeader";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  queryByAttribute,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("UserHeader", () => {
  const initialState = {
    user: {
      isLoggedIn: true,
      user: {
        id: 3,
        user_name: "test",
        first_name: "test",
        profile_avatar: null,
      },
    },
    all: {
      author: {
        first_name: "test",
        last_name: "test",
        user_name: "test",
        email: "test@a.a",
        user_location: "Ukraine",
        profile_avatar: null,
        profile_background: null,
      },
    },
  };

  const mockStore = configureStore();
  let store;
  it("renders a heading", () => {
    const posts = ["1", "2", "3"];

    store = mockStore(initialState);
    const state = store.getState();
    render(
      <Provider store={store}>
        <UserHeader posts={posts} />
      </Provider>
    );

    expect(screen.getByText(state.all.author.first_name)).toHaveTextContent(
      state.all.author.first_name
    );
  });
});
