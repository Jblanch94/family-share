import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  children: ReactNode;
  scrollToFeatures: VoidFunction;
}

const Layout = ({ children, scrollToFeatures }: Props): JSX.Element => {
  const { user } = useAuth();

  return (
    <>
      {user ? <Sidebar /> : <Navbar scrollToFeatures={scrollToFeatures} />}
      <main className={`${user ? "pl-32 sm:pl-64" : "pt-20"}`}>{children}</main>
    </>
  );
};

export default Layout;
