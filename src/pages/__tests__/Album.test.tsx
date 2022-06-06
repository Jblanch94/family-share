/* eslint-disable testing-library/no-unnecessary-act */
import { User } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

import App from "../../App";
import { screen, render, act } from "../../utils/test-utils";

const initialUser: User = {
  id: uuidv4(),
  app_metadata: {},
  user_metadata: {},
  created_at: new Date().toLocaleString(),
  aud: "",
};

describe("Album Page", () => {
  it("Renders without error", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/albums/1"], initialUser });
    });

    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
  });

  it("Renders correct header text", async () => {
    const HEADER_TEXT = "album 1";
    await act(async () => {
      render(<App />, { initialRoutes: ["/albums/1"], initialUser });
    });

    const header = await screen.findByRole("heading", { name: HEADER_TEXT });
    expect(header).toBeInTheDocument();
  });

  it("Renders correct number of images", async () => {
    await act(async () => {
      render(<App />, { initialRoutes: ["/albums/1"], initialUser });
    });
    const photos = await screen.findAllByRole("img");
    expect(photos.length).toBe(3);
  });
});
