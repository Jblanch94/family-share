import { ReactNode } from "react";

import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Sidebar />
      <main className='pl-32 sm:pl-64'>{children}</main>
    </>
  );
};

export default Layout;
