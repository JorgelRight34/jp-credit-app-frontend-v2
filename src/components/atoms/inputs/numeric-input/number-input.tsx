import Input from '../input/components/input'
import type { InputProps } from '../input/components/input'

const NumberInput = ({ onChange, ...props }: Omit<InputProps, 'type'>) => (
  <Input {...props} onChange={(v: any) => onChange(+v)} type="number" />
)

export default NumberInput
