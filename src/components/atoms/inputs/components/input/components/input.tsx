import BaseInput from './base-input'
import type { BaseInputProps } from './base-input'

export type InputProps = Omit<BaseInputProps, 'onChange'> & {
  onChange?: ((value: string) => void) | any
}

const Input = ({ onChange, ...props }: InputProps) => {
  return <BaseInput onChange={(e) => onChange?.(e.target.value)} {...props} />
}

export default Input
