import { User } from "@supabase/supabase-js";
import userEvent from "@testing-library/user-event";
import { v4 as uuidv4 } from "uuid";

import { render, screen } from "../../utils/test-utils";
import App from "../../App";

const initialUser: User = {
  id: uuidv4(),
  app_metadata: {},
  user_metadata: {},
  created_at: new Date().toLocaleString(),
  aud: "",
};

describe("Favorites Page", () => {
  it("Renders without error", () => {
    render(<App />, { initialRoutes: ["/favorites"], initialUser });

    const header = screen.getByRole("heading", { name: /favorites/i });
    expect(header).toBeInTheDocument();
  });
  it("Fetches Favorited Photos and displays them", async () => {
    render(<App />, { initialRoutes: ["/favorites"], initialUser });

    const photos = await screen.findAllByTestId("photo");
    expect(photos.length).toBe(1);
  });

  it("Clicking on the Photo brings the user to the page of that Photo", async () => {
    render(<App />, { initialRoutes: ["/favorites"], initialUser });

    const user = userEvent.setup();
    const photos = await screen.findAllByTestId("photo");
    await user.click(photos[0]);

    const header = await screen.findByRole("heading", { name: /photo 1/i });
    expect(header).toBeInTheDocument();
  });
  it("Clicking on the star icon removes the favorited photo", async () => {
    render(<App />, { initialRoutes: ["/favorites"], initialUser });

    const user = userEvent.setup();
    const starIcon = await screen.findByTestId("star");
    await user.click(starIcon);

    const photos = screen.queryAllByTestId("photo");
    expect(photos.length).toBe(0);

    const noResults = await screen.findByText(/no results/i);
    expect(noResults).toBeInTheDocument();
  });
});
