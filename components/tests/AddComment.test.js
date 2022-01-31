import React from "react";
import AddComment from "../AddComment";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  queryByAttribute,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AddComment", () => {
  it("renders a heading", () => {
    render(<AddComment />);

    expect(screen.getByRole("button")).toHaveTextContent("Comment");
  });
  it("rendering and submitting a basic Formik form", async () => {
    const handleCreate = jest.fn();
    const component = render(<AddComment />);
    const { container } = component;
    const getByName = queryByAttribute.bind(null, "name");
    const contentInput = getByName(container, "content");
    fireEvent.change(contentInput, {
      target: { value: "contentcontentcontentcontentcontent" },
    });

    expect(contentInput.value).toBe("contentcontentcontentcontentcontent");

    await waitFor(() => userEvent.click(screen.getByRole("button")));
    expect(handleCreate).toHaveBeenCalledWith({
      content: "contentcontentcontentcontentcontent",
    });
  });
});
