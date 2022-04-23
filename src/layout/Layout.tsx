import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { user } = useAuth();
  return (
    <>
      <Sidebar authenticated={user ? true : false} />
      <main className='pl-32 sm:pl-64'>{children}</main>
    </>
  );
};

export default Layout;
