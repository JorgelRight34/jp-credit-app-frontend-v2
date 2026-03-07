import SelectInput, { SelectInputProps } from './select'

const DaysIntervalSelect = (props: Omit<SelectInputProps, 'options'>) => {
  return (
    <SelectInput
      {...props}
      options={[
        [365, 'Anual'],
        [30, 'Mensual'],
        [7, 'Semanal'],
      ]}
    />
  )
}

export default DaysIntervalSelect
