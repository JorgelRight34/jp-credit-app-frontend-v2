import SelectInput, { SelectInputProps } from './select'

const DaysIntervalSelect = ({
  value = 1,
  ...props
}: Omit<SelectInputProps, 'options'>) => {
  return (
    <SelectInput
      {...props}
      value={value}
      allowNoOption={false}
      options={[
        [1, '---'],
        [365, 'Anual'],
        [30, 'Mensual'],
        [7, 'Semanal'],
      ]}
    />
  )
}

export default DaysIntervalSelect
