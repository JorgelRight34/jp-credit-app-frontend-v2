import clsx from "clsx";
import "./_navbar.css";
import { useMatch } from "@/hooks/useMatch";
import { useMemo } from "react";
import { NavItem } from "../models/navItem";
import { AppLink, Icon } from "@/components/atoms";

export interface NavLinkProps {
  option: NavItem;
  className?: string;
  onClick?: () => void;
  onExpand?: () => void;
}

const NavLink = ({
  option,
  className = "",
  onClick,
  onExpand,
}: NavLinkProps) => {
  const hasChildren = option?.children && option?.children.length > 0;
  const routeWithWildcard = useMemo(
    () => (option.route + "/*").replace(/\/+/g, "/"),
    [option.route],
  );
  const isActive = useMatch(routeWithWildcard);

  return (
    <div className="nav-link-container position-relative" onClick={onClick}>
      <div
        className={clsx(
          `rounded-end-3 nav-link-option nav-link-parent rounded-right p-0`,
          className,
          {
            "nav-link-active bg-active-transparent text-white shadow-sm":
              isActive,
            "text-gray-500": !isActive,
          },
        )}
      >
        <span
          className={clsx(`flex items-center p-2`, {
            "text-active font-medium": isActive,
          })}
        >
          <AppLink
            className={clsx(`flex min-w-0 flex-1 items-center`, {
              "text-link-active": isActive,
            })}
            to={option.route}
          >
            {/* Icon and name */}
            <div className="flex-1 truncate">
              <Icon
                icon={option.icon}
                label={option.name}
                labelClassName="truncate flex-1 min-w-0"
              />
            </div>
          </AppLink>
          {/* Menu trigger */}
          {hasChildren && (
            <div className="flex-shrink-0">
              <Icon
                wrapperClassName="ml-2 cursor-pointer flex-shrink-0"
                icon="arrow_right_alt"
                onClick={onExpand}
              />
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default NavLink;
