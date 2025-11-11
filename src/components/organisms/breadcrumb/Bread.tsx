import { Link, LinkProps } from "@mui/material";
import clsx from "clsx";
import { Icon } from "../ui";
import { BreadcrumbSpec } from "@/models";
import { useBreadCrumb } from "./useBreadCrumb";

interface BreadProps extends LinkProps {
  isLast: boolean;
  pathname?: string;
  onClick: () => void;
  breadcrumb: BreadcrumbSpec;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
}

const Bread = ({
  isLast,
  pathname,
  onClick,
  breadcrumb,
  params,
  ...props
}: BreadProps) => {
  const { title, icon } = useBreadCrumb({ breadcrumb, params });

  return (
    <Link
      className={clsx("flex items-center", {
        "cursor-pointer": !isLast,
        "text-accent-secondary": isLast,
        "opacity-50": breadcrumb.disabled,
      })}
      underline="none"
      color={isLast ? "" : "inherit"}
      aria-current={isLast ? "page" : undefined}
      href={breadcrumb.disabled ? undefined : pathname}
      onClick={(e) => {
        e.preventDefault();
        if (!breadcrumb.disabled) onClick();
      }}
      {...props}
    >
      <Icon
        icon={icon}
        label={title}
        labelClassName={breadcrumb.labelClassName}
      />
    </Link>
  );
};

export default Bread;
