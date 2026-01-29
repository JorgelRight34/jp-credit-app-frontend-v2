import MaskInput from '../masked-input/masked-input'
import type { MaskInputProps } from '../masked-input/masked-input'

const CitizenIdInput = (props: MaskInputProps) => (
  <MaskInput {...props} mask="000-0000000-0" placeholder="xxx-xxxxxxx-x" />
)

export default CitizenIdInput
