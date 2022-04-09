import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface LinkProps extends RouterLinkProps {}

const Link = ({ children, className, ...rest }: LinkProps): JSX.Element => {
  return (
    <RouterLink className={`text-xl ${className}`} {...rest}>
      {children}
    </RouterLink>
  );
};

export default Link;
