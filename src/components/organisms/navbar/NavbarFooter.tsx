import { NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { getFirstAndLastName } from "../../utils/utils";
import CurrentUserPicCard from "../../features/Profiles/components/CurrentUserPicCard";
import { primaryColor } from "../../utils/constants";
import clsx from "clsx";
import { Icon } from "../ui";

interface NavbarFooterProps {
  className?: string;
}

const NavbarFooter = ({ className }: NavbarFooterProps) => {
  const { user, logout } = useAuth();

  return (
    <>
      <div
        className={clsx(`flex flex-col p-2 border rounded w-full`, className)}
      >
        <NavLink
          className={"nav-link !flex items-center w-full text-gray-500"}
          to={"/login"}
        >
          <CurrentUserPicCard
            className="mr-2"
            color={primaryColor}
            background="#fff"
          />
          <span className="flex flex-col mr-auto">
            <span>{user && getFirstAndLastName(user)}</span>
          </span>
          <Icon icon="logout" className="ml-auto" onClick={logout} />
        </NavLink>
      </div>
    </>
  );
};

export default NavbarFooter;
