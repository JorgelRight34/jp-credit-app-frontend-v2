import type { SelectInputProps } from '@/components/atoms'
import { SelectInput } from '@/components/atoms'

const PageSizeSelector = ({ ...props }: SelectInputProps) => {
  return (
    <SelectInput
      label="Items"
      allowNoOption={false}
      {...props}
      options={[
        [10, 10],
        [20, 20],
        [25, 25],
        [50, 50],
        [100, 100],
      ]}
    />
  )
}

export default PageSizeSelector
