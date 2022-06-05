/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import App from "../../App";
import { server } from "../../mocks/server";

describe("Login Page", () => {
  it("Invalid password and email combination renders 'Invalid login credentials'", async () => {
    server.use(
      rest.post(
        "https://ycugklkeqbtlziiutnvx.supabase.co/auth/v1/token",
        (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({ message: "Invalid login credentials" })
          );
        }
      )
    );
    await act(async () => {
      render(<App />, { initialRoutes: ["/auth/login"] });
    });
    const user = userEvent.setup();

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "123@example.com");
    await user.type(passwordInput, "secretPassword123");
    await user.click(loginButton);

    const invalidCredentials = await screen.findByText(
      /invalid login credentials/i
    );
    expect(invalidCredentials).toBeInTheDocument();
  });

  it("successful login user is re-directed to the home page with a valid user", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/auth/login"] });
    });
    const user = userEvent.setup();

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "123@example.com");
    await user.type(passwordInput, "secretPassword123");
    await user.click(loginButton);

    const homePage = await screen.findByText("Albums");
    expect(homePage).toBeInTheDocument();
  });

  it("clicking on 'Don't have an account' link the user is brought to the sign up page", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/auth/login"] });
    });
    const user = userEvent.setup();

    const signUpLink = screen.getByRole("link", { name: /sign up/i });
    await user.click(signUpLink);
    const signUpFormHeader = await screen.findByRole("heading", {
      name: /sign up/i,
    });

    expect(signUpFormHeader).toBeInTheDocument();
  });
});
