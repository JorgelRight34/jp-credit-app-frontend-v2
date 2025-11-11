import "./_navbar.css";
import {
  loansNavOption,
  profileNavOption,
  transactionsNavOption,
} from "./navOptions";
import { Icon } from "../ui";
import clsx from "clsx";
import { useToggler } from "@/hooks/useToggler";
import Navbar from "./Navbar";
import { useEffect } from "react";
import Drawer from "../ui/Drawer";
import { NavbarLink } from "./navbarLink";
import { useRouter } from "@/hooks/useRouter";
import NavLink from "../ui/NavLink";

const options: NavbarLink[] = [
  loansNavOption,
  profileNavOption,
  {
    name: "Home",
    icon: "home",
    route: "/",
  },
  transactionsNavOption,
];

const BottomNavbar = () => {
  const [openDrawer, toggleOpenDrawer, close] = useToggler(false);
  const router = useRouter();

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.location.pathname]);

  return (
    <>
      <div className="bg-white h-full flex items-center lg:hidden justify-between px-3 p-2 w-full border-top">
        {options.map((option, index) => (
          <NavLink
            key={index}
            className={({ isActive }) =>
              clsx(
                {
                  "text-accent-important": isActive,
                  "!text-gray-500": !isActive,
                },
                "bg-white p-2"
              )
            }
            to={option.route}
          >
            <Icon icon={option.icon} style={{ height: "2rem" }} />
          </NavLink>
        ))}
        <Icon icon="menu" onClick={toggleOpenDrawer} />
      </div>
      <Drawer open={openDrawer} onClose={close}>
        <div role="presentation" className="h-full" style={{ width: "60dvw" }}>
          <Navbar />
        </div>
      </Drawer>
    </>
  );
};

export default BottomNavbar;
