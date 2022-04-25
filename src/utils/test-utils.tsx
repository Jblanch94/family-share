import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { SupabaseProvider } from "../contexts/SupabaseContext";
import { AuthProvider } from "../contexts/AuthContext";

const MemoryRouterWithInitialRoutes = ({
  children,
  initialRoutes,
}: {
  children: ReactNode;
  initialRoutes: string[];
}) => {
  return (
    <MemoryRouter initialEntries={initialRoutes}>
      <SupabaseProvider>
        <AuthProvider>{children}</AuthProvider>
      </SupabaseProvider>
    </MemoryRouter>
  );
};

const customRender = (
  ui: JSX.Element,
  options: { initialRoutes: string[] }
) => {
  const initialRoutes =
    options && options.initialRoutes ? options.initialRoutes : ["/"];
  return render(ui, {
    wrapper: (args) =>
      MemoryRouterWithInitialRoutes({ ...args, initialRoutes }),
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
