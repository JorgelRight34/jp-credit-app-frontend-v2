import clsx from "clsx";
import { IconName } from "@/models/iconName";
import { ElementType, ReactNode } from "react";
import Icon from "../icon/Icon";

export interface ButtonProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  labelClassName?: string;
  icon?: IconName;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  as?: ElementType;
}

const Button = ({
  as: Component = "button",
  children,
  className,
  icon,
  type = "button",
  disabled,
  labelClassName,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <Component
      className={clsx(
        `flex inline items-center justify-center !rounded-xl p-2 text-white shadow-sm`,
        className,
        { "!pointer-events-none !cursor-not-allowed !opacity-50": disabled }
      )}
      type={type}
      title=""
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {icon ? (
        <Icon
          icon={icon}
          wrapperClassName="justify-center"
          label={children}
          labelClassName={labelClassName}
        />
      ) : (
        children
      )}
    </Component>
  );
};

export default Button;
