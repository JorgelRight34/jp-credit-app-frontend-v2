import { NumericFormat } from 'react-number-format'
import Input from '../input/components/input'
import type { InputProps } from '../input/components/input'

type PercentageInputProps = Omit<InputProps, 'type' | 'defaultValue'> & {
  decimalScale?: number
}

const PercentageInput = ({
  value,
  min = 0,
  max = 100,
  onChange,
  ...props
}: PercentageInputProps) => {
  return (
    <NumericFormat
      value={value != undefined ? +value * 100 : ''}
      decimalScale={2}
      {...props}
      max={+max}
      min={+min}
      customInput={Input}
      thousandSeparator=","
      decimalSeparator="."
      valueIsNumericString
      suffix="%"
      label=""
      placeholder="0.00"
      allowNegative={false}
      onValueChange={({ floatValue }) =>
        onChange?.(floatValue !== undefined ? floatValue / 100 : undefined)
      }
      isAllowed={(values) =>
        values.floatValue === undefined || values.floatValue <= max
      }
    />
  )
}

export default PercentageInput
