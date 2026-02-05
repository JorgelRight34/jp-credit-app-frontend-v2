import MaskInput from '../masked-input/masked-input'
import type { MaskInputProps } from '../masked-input/masked-input'

const PhoneInput = (props: Omit<MaskInputProps, 'mask'>) => (
  <MaskInput
    {...props}
    mask="[+0] (000) 000-0000"
    placeholder="+0 (000) 000-0000"
  />
)

export default PhoneInput
