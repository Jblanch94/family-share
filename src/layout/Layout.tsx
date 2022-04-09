import { ReactNode } from "react";

import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
