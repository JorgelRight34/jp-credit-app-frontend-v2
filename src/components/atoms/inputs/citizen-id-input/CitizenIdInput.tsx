import MaskInput, { MaskInputProps } from "../masked-input/MaskedInput";

const CitizenIdInput = (props: MaskInputProps) => (
  <MaskInput {...props} mask="000-0000000-0" placeholder="xxx-xxxxxxx-x" />
);

export default CitizenIdInput;
