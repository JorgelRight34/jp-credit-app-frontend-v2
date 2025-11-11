import clsx from "clsx";
import NavOption, { NavOptionProps } from "./NavOption";
import { NavbarLink } from "./navbarLink";

type NavOptionsContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> &
  Omit<NavOptionProps, "option" | "onExpand"> & {
    options: NavbarLink[];
    onExpand: (option: NavbarLink) => void;
  };

const NavOptionsContainer = ({
  className,
  options,
  children,
  onExpand,
  ...props
}: NavOptionsContainerProps) => {
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
          <div className="mb-3" key={index}>
            <NavOption
              onExpand={() => onExpand?.(option)}
              option={option}
              {...props}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavOptionsContainer;
