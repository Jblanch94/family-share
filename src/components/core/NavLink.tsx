import { ReactNode } from "react";
import Link from "./Link";

interface NavLinkProps {
  icon: ReactNode;
  to: string;
  text: string;
}

const NavLink = ({ icon, to, text }: NavLinkProps): JSX.Element => {
  return (
    <Link
      to={to}
      className='text-gray hover:underline px-2 py-4 flex items-center gap-2 relative'>
      {icon}
      <span className='hidden sm:inline'>{text}</span>
    </Link>
  );
};

export default NavLink;
