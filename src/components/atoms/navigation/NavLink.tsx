import clsx from "clsx";
import Link from "./Link";
import { AppLinkProps } from "./AppLink";
import { usePathname } from "@/hooks/usePathname";
import { useMemo } from "react";

type NavLinkProps = Omit<AppLinkProps, "className"> & {
  className: (({ isActive }: { isActive: boolean }) => string) | string;
};

const NavLink = ({ to, children, className }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = useMemo(
    () => pathname.startsWith(to.toString()),
    [pathname, to],
  );

  return (
    <Link
      href={to}
      className={clsx(
        "link-reset !no-underline",
        typeof className === "function" ? className({ isActive }) : className,
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
