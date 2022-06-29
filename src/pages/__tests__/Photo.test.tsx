/* eslint-disable testing-library/no-unnecessary-act */
import userEvent from "@testing-library/user-event";
import { v4 as uuidv4 } from "uuid";
import { User } from "@supabase/supabase-js";
import { rest } from "msw";

import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "../../utils/test-utils";
import { server } from "../../mocks/server";
import App from "../../App";

const initialUser: User = {
  id: uuidv4(),
  app_metadata: {},
  user_metadata: {},
  created_at: new Date().toLocaleString(),
  aud: "",
};

const initialRoutes = ["/photos/1"];

describe("Photo Page", () => {
  beforeAll(() => {
    // @ts-expect-error
    global.IntersectionObserver = class FakeIntersectionObserver {
      observe() {}
      disconnect() {}
    };
  });
  it("renders without error", async () => {
    await act(async () => {
      render(<App />, { initialRoutes, initialUser });
    });
    const header = await screen.findByRole("heading", { name: /photo 1/i });
    expect(header).toBeInTheDocument();
  });
  it("displays the correct photo details", async () => {
    await act(async () => {
      render(<App />, { initialRoutes, initialUser });
    });
    // get the header, photo and description on hover over the image
    const user = userEvent.setup();
    const header = await screen.findByRole("heading", { name: /photo 1/i });
    const img = await screen.findByRole("img", { name: /photo 1/i });

    expect(header).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    await user.hover(img);
    const imgDescription = await screen.findByText(/description 1/i);
    expect(imgDescription).toBeInTheDocument();
    expect(imgDescription).toBeVisible();
  });
  it("renders only the first 10 comments", async () => {
    await act(async () => {
      render(<App />, { initialRoutes, initialUser });
    });
    const comments = await screen.findAllByTestId("comment");
    expect(comments.length).toBe(10);
  });
  it.skip("clicking on load more comments loads 10 more comments", async () => {
    await act(async () => {
      render(<App />, { initialRoutes, initialUser });
    });
    const user = userEvent.setup();
    const loadMoreCommentsBtn = await screen.findByRole("button", {
      name: /load more comments/i,
    });

    await user.click(loadMoreCommentsBtn);
    const comments = await screen.findAllByTestId("comment");
  });
  it("when no comments exist 'no comments'", async () => {
    render(<App />, { initialRoutes, initialUser });
  });
  it("submitting the edit form updates the photo details", async () => {
    server.use(
      rest.get(
        "https://ycugklkeqbtlziiutnvx.supabase.co/rest/v1/comments",
        (req, res, ctx) => {
          return res(ctx.delay(200), ctx.status(200), ctx.json([]));
        }
      )
    );
    render(<App />, { initialRoutes, initialUser });

    const comments = await screen.findAllByTestId("comment");
    expect(comments.length).toBe(0);

    const noComments = await screen.findByText(/no comments/i);
    expect(noComments).toBeInTheDocument();
  });
  it("renders favorite status of a filled in icon for favorited", async () => {
    await act(async () => {
      render(<App />, { initialRoutes, initialUser });
    });

    const starIcon = await screen.findByTestId("star");
    await waitFor(() => expect(starIcon).toHaveClass("fill-yellow-500"));
  });
  it("clicking on the star icon toggles the favorite status", async () => {
    render(<App />, { initialRoutes, initialUser });
    const user = userEvent.setup();

    const btn = await screen.findByRole("button", { name: /favorite/i });
    const starIcon = await screen.findByTestId("star");
    await user.click(btn);
    expect(starIcon).not.toHaveClass("fill-yellow-500");
    await user.click(btn);
    await waitFor(() => expect(starIcon).toHaveClass("fill-yellow-500"));
  });
  it.only("clicking on the edit icon opens the dialog; pressing esc, clicking close closes the dialog", async () => {
    render(<App />, { initialRoutes, initialUser });

    const user = userEvent.setup();
    const editIcon = await screen.findByRole("button", { name: /edit/i });

    await user.click(editIcon);
    let dialog: HTMLElement | null = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const closeBtn = await screen.findByRole("button", { name: /close/i });
    await user.click(closeBtn);
    dialog = screen.queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();

    await user.click(editIcon);
    fireEvent.keyDown(editIcon, { key: "Escape" });
    dialog = screen.queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });
  it("edit photo form updates the photo details", async () => {
    render(<App />, { initialRoutes, initialUser });

    const user = userEvent.setup();
    const editIcon = await screen.findByRole("button", { name: /edit/i });

    user.click(editIcon);
    const photoTitleInput = await screen.findByRole("textbox", {
      name: /title/i,
    });
    const photoDescriptionInput = await screen.findByRole("textbox", {
      name: /description/i,
    });
    user.type(photoTitleInput, "new title");
    user.type(photoDescriptionInput, "new description");

    const submitBtn = await screen.findByRole("button", { name: /save/i });
    user.click(submitBtn);

    const photoTitle = await screen.findByRole("heading", {
      name: /new title/i,
    });
    const img = await screen.findByRole("img", { name: /new title/i });
    await user.hover(img);
    const imgDescription = await screen.findByText(/new description/i);

    expect(photoTitle).toBeInTheDocument();
    expect(imgDescription).toBeVisible();
  });
});
