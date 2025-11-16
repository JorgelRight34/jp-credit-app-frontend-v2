import clsx from "clsx";
import React from "react";

const DataTableOption = ({
  children,
  className,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={clsx("text-accent", className)}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </span>
  );
};

export default DataTableOption;
