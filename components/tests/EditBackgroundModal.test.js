import React from "react";
import EditBackgroundModal from "../EditBackgroundModal";
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

describe("EditBackgroundModal", () => {
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
  let store;
  it("EditBackgroundModal", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <EditBackgroundModal />
      </Provider>
    );
  });
});
