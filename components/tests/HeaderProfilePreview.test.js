import React from "react";
import HeaderProfilePreview from "../HeaderProfilePreview";
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

describe("EditUserInfo", () => {
  const initialState = {
    user: {
      id: 3,
      user_name: "test",
      first_name: "test",
      last_name: "test",
      profile_avatar: null,
      profile_background: null,
      user_location: null,
    },
  };

  const mockStore = configureStore();
  let store;
  it("HeaderProfilePreview", () => {
    store = mockStore(initialState);
    const state = store.getState();
    render(
      <Provider store={store}>
        <HeaderProfilePreview />
      </Provider>
    );
    expect(screen.getByText(state.user.user_name)).toHaveTextContent(
      state.user.user_name
    );
  });
});
