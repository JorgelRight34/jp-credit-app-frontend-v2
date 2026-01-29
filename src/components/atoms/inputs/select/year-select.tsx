import { useMemo } from 'react'
import SelectInput from './select'
import type { SelectInputProps } from './select'

type YearSelectProps = SelectInputProps & {
  startYear?: number
  reverse?: boolean
  length?: number
}

const YearSelect = ({
  startYear = new Date().getFullYear(),
  reverse = false,
  length = 100,
  ...props
}: YearSelectProps) => {
  const yearOptions = useMemo(() => {
    const options = Array.from({ length }, (_, i) => [
      startYear - i,
      startYear - i,
    ])

    if (reverse) return options.reverse()
    return options
  }, [length, reverse, startYear])

  return <SelectInput {...props} options={yearOptions} />
}

export default YearSelect
