import clsx from "clsx";
import { NavLinkProps, NavLink as RNavLink } from "react-router";

const NavLink = ({ to, children, className }: NavLinkProps) => {
  return (
    <RNavLink to={to} className={clsx("link-reset !no-underline", className)}>
      {children}
    </RNavLink>
  );
};

export default NavLink;
