import type { SelectInputProps, SelectOptions } from '@/components/atoms'
import { SelectInput } from '@/components/atoms'

const defaultOptions: SelectOptions<number> = [
  [10, 10],
  [20, 20],
  [25, 25],
  [50, 50],
  [100, 100],
]

const PageSizeSelector = ({
  options = defaultOptions,
  ...props
}: SelectInputProps<number>) => {
  return (
    <SelectInput
      label="Items"
      allowNoOption={false}
      {...props}
      options={options}
    />
  )
}

export default PageSizeSelector
