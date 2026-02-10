import {
  collateralConditionsOptions,
  collateralTypeOptions,
} from '../lib/constants'
import type { useCollateralForm } from '../hooks/useCollateralForm'
import {
  CurrencyInput,
  DateInput,
  Form,
  FormGroup,
  FormRow,
  FormSelectGroup,
  Input,
  RichTextEditor,
} from '@/components'
import { LoanSearchInput } from '@/features/loans'

interface CollateralDataFormProps {
  form: ReturnType<typeof useCollateralForm>
  readOnly?: boolean
}

const CollateralDataForm = ({ form, readOnly }: CollateralDataFormProps) => {
  return (
    <Form form={form} readOnly={readOnly}>
      <FormRow>
        <FormGroup label="Título" name="title" input={Input} />
      </FormRow>
      <FormRow>
        <FormGroup label="Valor" name="value" input={CurrencyInput} />
        <FormGroup name="loanId" label="Préstamo" input={LoanSearchInput} />
      </FormRow>
      <FormRow>
        <FormSelectGroup
          options={collateralConditionsOptions}
          name="condition"
          label="Condición"
        />
        <FormSelectGroup
          options={collateralTypeOptions}
          name="type"
          label="Tipo"
        />
      </FormRow>
      <FormRow>
        <FormGroup name="location" label="Localidad" input={Input} optional />
        <FormGroup
          name="expirationDate"
          label="Expiración"
          input={DateInput}
          optional
        />
      </FormRow>
      <FormGroup
        name="description"
        label="Descripción"
        input={RichTextEditor}
        optional
      />
    </Form>
  )
}

export default CollateralDataForm
