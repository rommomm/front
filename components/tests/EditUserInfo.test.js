import React from "react";
import EditUserInfo from "../EditUserInfo";
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
  it("EditUserInfo", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <EditUserInfo />
      </Provider>
    );
  });
  it("EditUserInfo", async () => {
    const handleSave = jest.fn();
    const component = render(<EditUserInfo />);
    console.log("component", component);
    const { container } = component;
    const getByName = queryByAttribute.bind(null, "name");
    const contentInput = getByName(container, "content");
    fireEvent.change(contentInput, {
      target: { value: { first_name: "first_name", last_name: "last_name" } },
    });

    expect(contentInput.value).toBe("contentcontentcontentcontentcontent");

    await waitFor(() => userEvent.click(screen.getByRole("button")));
    expect(handleSave).toHaveBeenCalledWith({
      first_name: "first_name",
      last_name: "last_name",
    });
  });
});
