/* eslint-disable testing-library/no-unnecessary-act */
import { User } from "@supabase/supabase-js";
import userEvent from "@testing-library/user-event";

import { render, screen, act } from "../../utils/test-utils";
import App from "../../App";

const initialUser: User = {
  id: "abc123",
  app_metadata: {},
  user_metadata: {},
  created_at: new Date().toLocaleString(),
  aud: "",
};

const INITIAL_ROUTE = "/photos/add";

describe("Add Photo Page", () => {
  it("Renders without error", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: [INITIAL_ROUTE], initialUser });
    });

    const header = screen.getByRole("heading", { name: /add photo/i });
    expect(header).toBeInTheDocument();
  });
  it("displays validation error if title is empty", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: [INITIAL_ROUTE], initialUser });
    });

    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /add photo/i });

    await user.click(submitButton);
    const titleErrorMessage = await screen.findByRole("alert", {
      name: /title is required/i,
    });

    expect(titleErrorMessage).toBeInTheDocument();
  });
  it("submitting form there are no errors and the user is re-directed to the home page", async () => {
    const files: File[] = [
      new File(["mock-photo-1"], "mock-photo", { type: "image/png" }),
    ];
    await act(async () => {
      render(<App />, { initialRoutes: [INITIAL_ROUTE], initialUser });
    });

    const user = userEvent.setup();
    const titleInput = screen.getByRole("textbox", { name: /title/i });
    const descriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    const fileInput = screen.getByLabelText(/upload photo/i);
    const albumListbox = await screen.findByTestId("albums-select");
    await user.click(albumListbox);
    const albums = await screen.findAllByRole("listitem");
    const submitButton = screen.getByRole("button", { name: /add photo/i });
    await user.type(titleInput, "Title 1");
    await user.type(descriptionInput, "Description 1");
    await user.upload(fileInput, files);
    await user.click(albums[0]);
    await user.click(submitButton);

    const header = await screen.findByRole("heading", { name: /albums/i });
    expect(header).toBeInTheDocument();
  });
});
