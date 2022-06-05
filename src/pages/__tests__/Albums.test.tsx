/* eslint-disable testing-library/no-unnecessary-act */
import { User } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { rest } from "msw";

import App from "../../App";
import { screen, render, act } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import { server } from "../../mocks/server";

const initialUser: User = {
  id: uuidv4(),
  app_metadata: {},
  user_metadata: {},
  created_at: new Date().toLocaleString(),
  aud: "",
};

describe("Albums Page", () => {
  it("Albums Page renders without error", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/"], initialUser });
    });

    const albumHeader = screen.getByRole("heading", { name: /albums/i });
    expect(albumHeader).toBeInTheDocument();
  });
  it("On Page Load loads the correct number of albums", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/"], initialUser });
    });

    const cards = await screen.findAllByTestId("card");
    expect(cards.length).toBe(3);
  });
  it("Searching for an album only displays closest album names", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/"], initialUser });
    });

    const user = userEvent.setup();
    const searchInput = screen.getByRole("textbox", { name: /name/i });
    const submitButton = screen.getByRole("button", { name: /search albums/i });
    await user.type(searchInput, "album 1");
    await user.click(submitButton);

    const cards = await screen.findAllByTestId("card");
    expect(cards.length).toBe(1);
  });
  it("No albums renders a svg with text of No Results Found", async () => {
    server.use(
      rest.post(
        "https://ycugklkeqbtlziiutnvx.supabase.co/rest/v1/rpc/search_albums",
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json([]));
        }
      )
    );
    await act(async () => {
      render(<App />, { initialRoutes: ["/"], initialUser });
    });

    const user = userEvent.setup();
    const searchInput = screen.getByRole("textbox", { name: /name/i });
    const submitButton = screen.getByRole("button", { name: /search albums/i });
    await user.type(searchInput, "no results");
    await user.click(submitButton);

    const noResultsFound = await screen.findByText("No Results Found");
    expect(noResultsFound).toBeInTheDocument();

    const cards = screen.queryAllByTestId("card");
    expect(cards.length).toBe(0);
  });
});
