import clsx from "clsx";
import React from "react";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div
      className={clsx("rounded-3 border bg-white p-3", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
