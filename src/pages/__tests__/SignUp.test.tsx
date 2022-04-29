/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import App from "../../App";
import { server } from "../../mocks/server";
import { act } from "react-dom/test-utils";

describe("Sign Up Page", () => {
  it("renders required error for each text field in the form", async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(<App />, { initialRoutes: ["/auth/sign-up"] });
    });

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });

    await act(async () => {
      await user.click(submitButton);
    });

    const validationAlerts = await screen.findAllByRole("alert");
    expect(validationAlerts).toHaveLength(5);
  });

  it("renders validation text for invalid email", async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(<App />, { initialRoutes: ["/auth/sign-up"] });
    });

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    const emailInput: HTMLInputElement = screen.getByRole("textbox", {
      name: /email/i,
    });

    await user.type(emailInput, "123");
    await user.click(submitButton);

    const invalidEmail = await screen.findByText("Email is invalid!");
    expect(invalidEmail).toBeInTheDocument();
  });

  it("renders validation error for password if the min length is not at least 6 characters", async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(<App />, { initialRoutes: ["/auth/sign-up"] });
    });

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    const passwordInput = screen.getByLabelText("Password");

    await user.type(passwordInput, "12345");
    await user.click(submitButton);

    const passwordTooShort = await screen.findByText(
      /Password must be at least 6 characters!/i
    );
    expect(passwordTooShort).toBeInTheDocument();
  });

  it("renders validation error when passwords do not match", async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(<App />, { initialRoutes: ["/auth/sign-up"] });
    });

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    await user.type(passwordInput, "password1");
    await user.type(confirmPasswordInput, "password2");
    await user.click(submitButton);

    const passwordsDoNotMatch = await screen.findAllByText(
      "Passwords do not match!"
    );
    expect(passwordsDoNotMatch).toHaveLength(2);
  });

  it.skip("successful form submission re-directs user to home page", async () => {
    render(<App />, { initialRoutes: ["/auth/sign-up"] });

    const user = userEvent.setup();

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    const familyNameInput = screen.getByRole("textbox", {
      name: /family name/i,
    });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    await user.type(familyNameInput, "Blanchard");
    await user.type(nameInput, "Johnny");
    await user.type(emailInput, "123@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");

    // submit form
    await user.click(submitButton);

    const homePage = await screen.findByText("Albums Page");
    expect(homePage).toBeInTheDocument();
  });

  it("Renders 'User already exists error' and is still on the form page", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/auth/sign-up"] });
    });

    const errorMessage = "User already Exists!";

    server.use(
      rest.post(
        "https://ycugklkeqbtlziiutnvx.supabase.co/auth/v1/signup",
        (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: errorMessage }));
        }
      )
    );

    const user = userEvent.setup();

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    const familyNameInput = screen.getByRole("textbox", {
      name: /family name/i,
    });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");

    await user.type(familyNameInput, "Blanchard");
    await user.type(nameInput, "Johnny");
    await user.type(emailInput, "123@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");

    // submit form
    await user.click(submitButton);

    const userExistsMessage = await screen.findByText(errorMessage);
    expect(userExistsMessage).toBeInTheDocument();
  });
});
