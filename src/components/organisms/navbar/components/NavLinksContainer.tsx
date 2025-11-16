import clsx from "clsx";
import NavLink, { NavLinkProps } from "./NavLink";
import { NavItem } from "../models/navItem";

type NavLinksContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> &
  Omit<NavLinkProps, "option" | "onExpand"> & {
    options: NavItem[];
    onExpand: (option: NavItem) => void;
  };

const NavLinksContainer = ({
  className,
  options,
  children,
  onExpand,
  ...props
}: NavLinksContainerProps) => {
  return (
    <div
      className={clsx("fade-in flex-1 overflow-y-auto", className)}
      style={{
        transition: "all 0.3s ease-in-out",
      }}
    >
      {children}
      <div className="flex flex-col px-3 pt-3">
        {options.map((option, index) => (
          <NavLink
            key={index}
            className="mb-3"
            onExpand={() => onExpand?.(option)}
            option={option}
            {...props}
          />
        ))}
      </div>
    </div>
  );
};

export default NavLinksContainer;
