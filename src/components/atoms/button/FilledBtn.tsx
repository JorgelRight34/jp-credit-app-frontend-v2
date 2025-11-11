import { ComponentPropsWithoutRef, ReactNode } from "react";

interface FilledBtnProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  className?: string;
}

/**
 * Accent-styled button component.
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * @param props - Additional button props
 * @example <FilledBtn>Submit</FilledBtn>
 * @example <FilledBtn className="ml-4" onClick={handleClick}>Confirm</FilledBtn>
 */
const FilledBtn = ({
  children,
  className,
  type = "button",
  ...props
}: FilledBtnProps) => {
  return (
    <button
      className={`btn btn-filled text-white shadow-sm ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default FilledBtn;
