import { forwardRef, useMemo } from "react";
import { IMaskInput } from "react-imask";
import Input from "../input/Input";
import { InputBaseComponentProps } from "@mui/material";

export type MaskInputProps = {
  onChange?: (val?: string) => void;
  name?: string;
  placeholder?: string;
  value?: string | number;
};

const MaskedInput = forwardRef<
  HTMLInputElement,
  InputBaseComponentProps & { mask: string }
>(({ onChange, mask, ...props }, ref) => {
  return (
    <IMaskInput
      {...props}
      mask={mask}
      definitions={{
        "#": /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(_, maskRef) => onChange(maskRef.unmaskedValue)}
      overwrite
    />
  );
});

const MaskInput = forwardRef<
  HTMLInputElement,
  MaskInputProps & { mask: string }
>(({ mask, ...props }, ref) => {
  const MaskedInputWithMask = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/display-name
      forwardRef<HTMLInputElement, any>((inputProps, inputRef) => (
        <MaskedInput {...inputProps} mask={mask} ref={inputRef} />
      )),
    [mask]
  );

  return <Input ref={ref} {...props} inputComponent={MaskedInputWithMask} />;
});

MaskedInput.displayName = "MaskedInput";
MaskInput.displayName = "MaskInput";

export default MaskInput;
