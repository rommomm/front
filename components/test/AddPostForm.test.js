import React from "react";
import AddPostForm from "../AddPostForm";
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
      data: {
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
    const author = {
      id: 1,
      first_name: "test",
      last_name: "test",
      user_name: "test",
      email: "test@a.a",
      user_location: "Ukraine",
      profile_avatar: null,
      profile_background: null,
    };
    store = mockStore(initialState);
    const post = {
      id: 2,
      content: "Aut ratione voluptatem quasi.",
      created_at: "2022-01-30T10:18:04.000000Z",
      updated_at: "2022-01-30T10:18:04.000000Z",
      comments_count: 2,
      author: {
        id: 1,
        user_name: "maeve80",
        first_name: "Edmond",
        profile_avatar: null,
      },
    };
    render(
      <Provider store={store}>
        <AddPostForm />
      </Provider>
    );

    // expect(screen.getByText(post.content)).toHaveTextContent(post.content);
    // expect(screen.getByText(author.last_name)).toHaveTextContent(
    //   author.last_name
    // );
    // expect(screen.getByText(author.user_name)).toHaveTextContent(
    //   author.user_name
    // );
    // expect(screen.getByText(author.user_location)).toHaveTextContent(
    //   author.user_location || "Запорожье"
    // );
    // expect(screen.getByText(author.profile_avatar)).toHaveTextContent(
    //   author.profile_background || "/default/avatar.png"
    // );
    // expect(screen.getByText(author.profile_avatar)).toHaveTextContent(
    //   author.profile_background || "/default/background.png"
    // );
  });
});
