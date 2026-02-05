import SelectInput from './select'
import type { SelectInputProps } from './select'

const CivilStatusSelect = (props: SelectInputProps) => {
  return (
    <SelectInput
      {...props}
      options={[
        ['married', 'Casad@'],
        ['single', 'Solter@'],
        ['divorced', 'Divorciad@'],
        ['widowed', 'Viud@'],
      ]}
    />
  )
}

export default CivilStatusSelect
