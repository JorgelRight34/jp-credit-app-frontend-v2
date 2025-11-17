import clsx from "clsx";
import NavbarLink, { NavbarLinkProps } from "./NavbarLink";
import { NavItem } from "../models/navItem";

type NavbarLinksContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> &
  Omit<NavbarLinkProps, "option" | "onExpand"> & {
    options: NavItem[];
    onExpand: (option: NavItem) => void;
  };

const NavbarLinksContainer = ({
  className,
  options,
  children,
  onExpand,
  ...props
}: NavbarLinksContainerProps) => {
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
          <NavbarLink
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

export default NavbarLinksContainer;
