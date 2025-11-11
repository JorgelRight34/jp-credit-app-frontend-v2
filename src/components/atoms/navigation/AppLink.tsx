import { ReactNode } from "react";
import Link from "./Link";
import clsx from "clsx";
import Icon, { IconProps } from "./Icon";
import { LinkProps } from "react-router";
import { getUrlParams } from "@/utils/utils";
import { Params } from "@/models/params";

export interface AppLinkProps extends IconProps {
  to?: LinkProps["to"];
  children?: ReactNode;
  className?: string;
  params?: Params;
  onClick?: (event: React.MouseEvent) => void;
}

const AppLink = ({
  to,
  children,
  className = "",
  icon,
  orientation,
  params,
  onClick,
  ...props
}: AppLinkProps) => {
  return (
    <Link
      className={clsx(`link-reset`, className)}
      onClick={onClick}
      to={to ? (params ? `${to}/?${getUrlParams(params)}` : to) : ""}
    >
      {icon ? (
        <Icon
          icon={icon}
          orientation={orientation}
          {...props}
          children={children}
        />
      ) : (
        children
      )}
    </Link>
  );
};

export default AppLink;
