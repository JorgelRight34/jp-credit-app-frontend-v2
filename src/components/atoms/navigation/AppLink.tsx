import { ReactNode } from "react";
import Link from "./Link";
import clsx from "clsx";
import { getUrlParams } from "@/utils/utils";
import { Params } from "@/models/params";
import { LinkProps } from "next/link";
import Icon, { IconProps } from "../icon/Icon";

export interface AppLinkProps extends IconProps {
  to: LinkProps["href"];
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
      href={to ? (params ? `${to}/?${getUrlParams(params)}` : to) : ""}
    >
      {icon ? (
        <Icon icon={icon} orientation={orientation} {...props}>
          {children}
        </Icon>
      ) : (
        children
      )}
    </Link>
  );
};

export default AppLink;
