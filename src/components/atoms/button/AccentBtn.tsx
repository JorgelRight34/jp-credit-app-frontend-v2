import clsx from "clsx";
import Button, { ButtonProps } from "./Button";

export type AccentBtnProps = ButtonProps;

/**
 * Accent-styled button component.
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * @param props - Additional button props
 * @example <AccentBtn>Submit</AccentBtn>
 * @example <AccentBtn className="ml-4" onClick={handleClick}>Confirm</AccentBtn>
 */
const AccentBtn = ({ className, ...props }: AccentBtnProps) => {
  return <Button className={clsx("btn-accent px-3", className)} {...props} />;
};

export default AccentBtn;
