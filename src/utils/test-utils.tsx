import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { SupabaseProvider } from "../contexts/SupabaseContext";
import { AuthProvider } from "../contexts/AuthContext";
import { User } from "@supabase/supabase-js";

const MemoryRouterWithInitialRoutes = ({
  children,
  initialRoutes,
  initialUser,
}: {
  children: ReactNode;
  initialRoutes: string[];
  initialUser: User | null;
}) => {
  return (
    <MemoryRouter initialEntries={initialRoutes}>
      <SupabaseProvider>
        <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
      </SupabaseProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: JSX.Element,
  options: { initialRoutes: string[]; initialUser?: User | null }
) => {
  const initialRoutes =
    options && options.initialRoutes ? options.initialRoutes : ["/"];
  const initialUser =
    options && options.initialUser ? options.initialUser : null;
  return render(ui, {
    wrapper: (args) =>
      MemoryRouterWithInitialRoutes({ ...args, initialRoutes, initialUser }),
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
