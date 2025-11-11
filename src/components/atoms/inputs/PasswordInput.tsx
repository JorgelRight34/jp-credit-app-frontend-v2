import { forwardRef, useState } from "react";
import Input, { InputProps } from "./Input";

type PasswordInputProps = InputProps;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <Input
        {...props}
        ref={ref}
        type={show ? "text" : "password"}
        icon={{
          icon: show ? "visibility_off" : "visibility",
          iconDirection: "right",
          onClick: () => setShow((prev) => !prev),
        }}
      />
    );
  }
);

export default PasswordInput;
