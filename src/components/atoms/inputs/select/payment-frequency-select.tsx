import SelectInput, { SelectInputProps } from './select'

const PaymentFrequencySelect = (props: Omit<SelectInputProps, 'options'>) => {
  return (
    <SelectInput
      {...props}
      options={[
        [12, 'Mensual'],
        [1, 'Anual'],
        [4, 'Trimestral'],
        [2, 'Semestral'],
      ]}
    />
  )
}

export default PaymentFrequencySelect
