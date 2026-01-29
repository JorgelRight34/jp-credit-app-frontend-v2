import SelectInput from '../select/select'
import type { SelectInputProps } from '../select/select'
import { months } from '@/lib/utils/constants'

type MonthSelectProps = SelectInputProps

const defaultValue = new Date().getMonth()

const MonthSelect = ({ ...props }: MonthSelectProps) => {
  return (
    <SelectInput
      {...props}
      defaultValue={defaultValue}
      options={months.map((month, index) => [index, month])}
    />
  )
}

export default MonthSelect
