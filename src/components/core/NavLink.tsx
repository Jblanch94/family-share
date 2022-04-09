import { ReactNode } from "react";
import RouterNavLink from "./RouterNavLink";

interface NavLinkProps {
  icon: ReactNode;
  to: string;
  text: string;
}

const NavLink = ({ icon, to, text }: NavLinkProps): JSX.Element => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        ` text-gray hover:underline px-2 py-4 flex items-center gap-2 relative ${
          isActive ? "text-green-500" : undefined
        }`
      }>
      {icon}
      <span className='hidden sm:inline'>{text}</span>
    </RouterNavLink>
  );
};

export default NavLink;
