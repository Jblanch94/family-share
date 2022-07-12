import { useState, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import Logo from "./Logo";
import MobileMenuButton from "./MobileMenuButton";
import NavLinks from "./NavLinks";

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(function toggleMenu() {
    setIsOpen((st) => !st);
  }, []);

  const navLinks = useMemo(() => {
    return [
      {
        id: uuidv4(),
        title: "Login",
        path: "/auth/login",
      },
      {
        id: uuidv4(),
        title: "Sign Up",
        path: "/auth/sign-up",
      },
      {
        id: uuidv4(),
        title: "Services",
        path: "#services",
      },
    ];
  }, []);

  return (
    <header>
      <nav className='flex items-center justify-between flex-wrap p-6 fixed top-0 left-0 right-0 bg-blue-400'>
        <Logo />
        <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
        <NavLinks navLinks={navLinks} isOpen={isOpen} />
      </nav>
    </header>
  );
}
