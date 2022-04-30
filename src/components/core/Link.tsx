import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface LinkProps extends RouterLinkProps {}

const Link = ({ children, className, ...rest }: LinkProps): JSX.Element => {
  const classNames = `text-xl ${className}`;
  return (
    <RouterLink className={classNames} {...rest}>
      {children}
    </RouterLink>
  );
};

export default Link;
