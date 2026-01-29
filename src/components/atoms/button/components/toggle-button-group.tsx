import clsx from "clsx";

type ToggleButtonGroupProps = React.HTMLAttributes<HTMLDivElement>;

const Item = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props} className="border-end p-1">
    {children}
  </div>
);

const ToggleButtonGroup = ({ className, children }: ToggleButtonGroupProps) => {
  return (
    <div className={clsx("flex border rounded-xl", className)}>{children}</div>
  );
};

ToggleButtonGroup.Item = Item;

export default ToggleButtonGroup;
