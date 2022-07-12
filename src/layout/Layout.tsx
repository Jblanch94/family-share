import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const { user } = useAuth();
  return (
    <>
      {user ? <Sidebar /> : <Navbar />}
      <main className='pl-32 sm:pl-64'>{children}</main>
    </>
  );
};

export default Layout;
