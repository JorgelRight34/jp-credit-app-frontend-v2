import Input from '../input/components/input'
import type { InputProps } from '../input/components/input'

const NumericInput = (props: Omit<InputProps, 'type'>) => (
  <Input {...props} type="number" />
)

export default NumericInput
