import { NumericFormat } from 'react-number-format'
import type { InputProps } from '../input/components/input'
import BaseInput from '../input/components/base-input'

type PercentageInputProps = Omit<InputProps, 'type' | 'defaultValue'> & {
  decimalScale?: number
}

const PercentageInput = ({
  value,
  min = 0,
  max = 100,
  decimalScale = 2,
  onChange,
  ...props
}: PercentageInputProps) => {
  const maxNum = Number(max)
  const minNum = Number(min)

  return (
    <NumericFormat
      {...props}
      customInput={BaseInput}
      value={value != null ? String(Number(value) * 100) : ''}
      valueIsNumericString
      decimalScale={decimalScale}
      thousandSeparator=","
      decimalSeparator="."
      suffix="%"
      placeholder="0.00"
      allowNegative={false}
      isAllowed={({ floatValue }) =>
        floatValue === undefined ||
        (floatValue >= minNum && floatValue <= maxNum)
      }
      onValueChange={({ floatValue }) =>
        onChange?.(floatValue === undefined ? undefined : floatValue / 100)
      }
    />
  )
}

export default PercentageInput
