import { NumericFormat } from 'react-number-format'
import Input from '../input/components/input'
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
      {...props}
      customInput={Input}
      label={label}
      thousandSeparator
      valueIsNumericString
      prefix="$"
      defaultValue={props.defaultValue as string | null | undefined}
      value={(value as string | number | null | undefined) ?? ''}
      name={name}
      onValueChange={(values) => {
        onChange?.(values.value)
      }}
      onBlur={onBlur}
    />
  )
}

export default CurrencyInput
