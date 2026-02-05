import SelectInput from './select'
import type { SelectInputProps } from './select'

const GenderSelect = (props: SelectInputProps) => {
  return (
    <SelectInput
      {...props}
      options={[
        ['M', 'Masculino'],
        ['F', 'Femenino'],
      ]}
    />
  )
}

export default GenderSelect
