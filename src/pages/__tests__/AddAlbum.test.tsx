/* eslint-disable testing-library/no-unnecessary-act */
import { User } from "@supabase/supabase-js";
import { render, screen, act } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import App from "../../App";

const initialUser: User = {
  id: "abc123",
  app_metadata: {},
  user_metadata: {},
  created_at: new Date().toLocaleString(),
  aud: "",
};

describe("Add Album Page", () => {
  it.only("renders form validation error when name field is empty", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/albums/add"], initialUser });
    });

    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /add album/i });

    await user.click(submitButton);
    const validationError = await screen.findByText(/album name is required/i);
    expect(validationError).toBeInTheDocument();
  });

  it("successful form submission re-directs user to home page", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/albums/add"], initialUser });
    });

    const user = userEvent.setup();
    const albumNameField = screen.getByRole("textbox", { name: /name/i });
    const submitButton = screen.getByRole("button", { name: /add album/i });

    await user.type(albumNameField, "album 1");
    await user.click(submitButton);

    const homeHeader = await screen.findByRole("heading", { name: /albums/i });
    expect(homeHeader).toBeInTheDocument();
  });

  it("Add Album text appears on page load and a loading spinner appears during form submission", async () => {
    let appContainer: HTMLElement;
    await act(async () => {
      const { container } = render(<App />, {
        initialRoutes: ["/albums/add"],
        initialUser,
      });
      appContainer = container;
    });

    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /add album/i });

    expect(submitButton).toHaveTextContent(/add album/i);
    return user.click(submitButton).then(async () => {
      // eslint-disable-next-line testing-library/no-node-access
      const loadingIcon = appContainer.querySelector("svg");
      expect(loadingIcon).toBeInTheDocument();
    });
  });
});
