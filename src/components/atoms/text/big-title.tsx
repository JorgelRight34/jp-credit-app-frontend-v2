import clsx from "clsx";

const BigTitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1 className={clsx("mb-0", className)} {...props}>
      {children}
    </h1>
  );
};

export default BigTitle;
