import NavLinkItem from "./NavLinkItem";

interface NavLink {
  id: string;
  title: string;
  path: string;
}

interface Props {
  navLinks: NavLink[];
  isOpen: boolean;
}

export default function NavLinks({ navLinks, isOpen }: Props): JSX.Element {
  return (
    <ul
      className={`md:flex md:items-center ${
        isOpen ? "block" : "hidden"
      } md:space-x-4 md:text-base md:w-auto w-full mt-4 md:mt-0 text-lg font-semibold`}>
      {navLinks.map((navLink) => (
        <NavLinkItem {...navLink} key={navLink.id} />
      ))}
    </ul>
  );
}
