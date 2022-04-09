import { NavLink, NavLinkProps } from "react-router-dom";

interface RouterNavLinkProps extends NavLinkProps {}

const RouterNavLink = ({ children, ...rest }: RouterNavLinkProps) => {
  return <NavLink {...rest}>{children}</NavLink>;
};

export default RouterNavLink;
