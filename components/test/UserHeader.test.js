import React from "react";
import UserHeader from "../UserHeader";
import { render, screen } from "@testing-library/react";
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
    render(
      <Provider store={store}>
        <UserHeader author={author} />
      </Provider>
    );

    expect(screen.getByText(author.first_name)).toHaveTextContent(
      author.first_name
    );
    expect(screen.getByText(author.last_name)).toHaveTextContent(
      author.last_name
    );
    expect(screen.getByText(author.user_name)).toHaveTextContent(
      author.user_name
    );
  });
});
