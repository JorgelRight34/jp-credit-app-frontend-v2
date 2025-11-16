import { Icon, NavLink } from "@/components/atoms";
import { useAuth } from "@/contexts/AuthContext";
import CurrentUserPicCard from "@/features/profiles/components/CurrentUserPicCard";
import { primaryColor } from "@/utils/constants";
import { getFirstAndLastName } from "@/utils/utils";
import clsx from "clsx";

interface NavbarFooterProps {
  className?: string;
}

const NavbarFooter = ({ className }: NavbarFooterProps) => {
  const { user, logout } = useAuth();

  return (
    <div className={clsx(`flex w-full flex-col rounded border p-2`, className)}>
      <NavLink
        className={"nav-link !flex w-full items-center text-gray-500"}
        to={"/login"}
      >
        <CurrentUserPicCard
          className="mr-2"
          color={primaryColor}
          background="#fff"
        />
        <span className="mr-auto flex flex-col">
          <span>{user && getFirstAndLastName(user)}</span>
        </span>
        <Icon icon="logout" className="ml-auto" onClick={logout} />
      </NavLink>
    </div>
  );
};

export default NavbarFooter;
