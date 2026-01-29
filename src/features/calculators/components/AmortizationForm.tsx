import { calculatorClient } from '../services/calculatorClient'
import { AmortizationCalculatorInput } from '../models/amortizationCalculatorInput'
import {
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from '@/components'
import { COMPOUND_OPTIONS } from '@/lib/utils/constants'

type AmortizationFormProps = QuerySearchProps<AmortizationCalculatorInput>

const fields: QuerySearchInput<AmortizationCalculatorInput>[] = [
  {
    name: 'principalBalance',
    id: 'principalBalance',
    label: 'Monto',
    placeholder: 'Monto',
    type: 'currency',
  },
  {
    name: 'annualInterestRate',
    id: 'annualInterestRate',
    label: 'Tasa',
    type: 'percentage',
    placeholder: 'Tasa',
  },
  {
    name: 'paymentFrequency',
    id: 'paymentFrequency',
    label: 'Frecuencia de Pago',
    type: 'select',
    options: [
      [12, 'Mensual'],
      [1, 'Anual'],
    ],
  },
  {
    name: 'numberOfPayments',
    id: 'numberOfPayments',
    type: 'number',
    label: 'No. Pagos',
    min: 1,
  },
  {
    name: 'compound',
    id: 'compound',
    label: 'Capitalización',
    type: 'select',
    options: COMPOUND_OPTIONS,
  },
]

const AmortizationForm = ({ ...props }: AmortizationFormProps) => {
  return (
    <EntityQuerySearch
      fields={fields}
      onDownload={calculatorClient.downloadAmortizationBlobAs}
      {...props}
    />
  )
}

export default AmortizationForm
