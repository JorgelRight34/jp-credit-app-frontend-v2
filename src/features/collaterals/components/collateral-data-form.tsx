import {
  collateralConditionsOptions,
  collateralStatusOptions,
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
  NumericInput,
  RichTextEditor,
} from '@/components'
import { LoanSearchInput } from '@/features/loans'

interface CollateralDataFormProps {
  form: ReturnType<typeof useCollateralForm>
}

const CollateralDataForm = ({ form }: CollateralDataFormProps) => {
  return (
    <Form form={form}>
      <FormRow>
        <FormGroup label="Título" name="title" input={Input} />
      </FormRow>
      <FormRow>
        <FormGroup label="Valor" name="value" input={CurrencyInput} />
        <FormSelectGroup
          options={collateralTypeOptions}
          name="type"
          label="Tipo"
        />
      </FormRow>
      <FormRow>
        <FormSelectGroup
          options={collateralConditionsOptions}
          name="condition"
          label="Condición"
        />
        <FormSelectGroup
          options={collateralStatusOptions}
          name="status"
          label="Estado"
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
      <FormRow>
        <FormGroup name="ownerId" label="Propietario" input={NumericInput} />
        <FormGroup name="loanId" label="Préstamo" input={LoanSearchInput} />
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
