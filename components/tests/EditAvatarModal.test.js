import React from "react";
import EditAvatarModal from "../EditAvatarModal";
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

describe("EditAvatarModal", () => {
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
  it("EditAvatarModal", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <EditAvatarModal />
      </Provider>
    );
  });
});
