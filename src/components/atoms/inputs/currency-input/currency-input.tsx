import { NumericFormat } from 'react-number-format'
import BaseInput from '../input/components/base-input'
import type { InputProps } from '../input/components/input'

type CurrencyInputProps = Omit<InputProps, 'type'>

const CurrencyInput = ({
  value,
  name,
  label,
  onChange,
  onBlur,
  ...props
}: CurrencyInputProps) => {
  return (
    <NumericFormat
      customInput={BaseInput}
      label={label}
      thousandSeparator
      valueIsNumericString
      prefix="$"
      defaultValue={props.defaultValue as string | null | undefined}
      value={value ?? ''}
      name={name}
      onValueChange={(values) => onChange?.(values.value)}
      onBlur={onBlur}
      {...props}
    />
  )
}

export default CurrencyInput
