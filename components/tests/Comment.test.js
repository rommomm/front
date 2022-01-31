import React from "react";
import Comment from "../Comment";
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

describe("AddComment", () => {
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
  };

  const mockStore = configureStore();
  let store, wrapper;
  it("renders a heading", () => {
    const comment = {
      id: 47,
      content: "qfeeeeeeeeeeeeeeeqfeqfeqfeqfe",
      created_at: "2022-01-31T20:54:54.000000Z",
      updated_at: "2022-01-31T20:54:54.000000Z",
      author: {
        id: 3,
        user_name: "test",
        first_name: "test",
        profile_avatar: null,
      },
    };

    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Comment comment={comment} />
      </Provider>
    );

    expect(screen.getByText(comment.author.first_name)).toHaveTextContent(
      comment.author.first_name
    );
  });
});
