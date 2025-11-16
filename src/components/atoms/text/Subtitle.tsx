import clsx from "clsx";

const Subtitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={clsx("text-gray-500", className)} {...props}>
      {children}
    </span>
  );
};

export default Subtitle;
