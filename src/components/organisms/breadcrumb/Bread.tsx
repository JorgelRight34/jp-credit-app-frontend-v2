import { Link, LinkProps } from "@mui/material";
import clsx from "clsx";
import { useBreadCrumb } from "./useBreadCrumb";
import { BreadcrumbSpec } from "./breadcrumbSpec";
import { Icon } from "@/components/atoms";

interface BreadProps extends LinkProps {
  isLast: boolean;
  pathname?: string;
  breadcrumb: BreadcrumbSpec;
  params?: Record<string, unknown>;
  onClick: () => void;
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
