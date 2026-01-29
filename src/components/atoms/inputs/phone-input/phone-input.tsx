import MaskInput from '../masked-input/masked-input'
import type { MaskInputProps } from '../masked-input/masked-input'

const PhoneInput = (props: Omit<MaskInputProps, 'mask'>) => (
  <MaskInput {...props} mask="+1 (000) 000-0000" placeholder="xxx-xxxxxxx-x" />
)

export default PhoneInput
