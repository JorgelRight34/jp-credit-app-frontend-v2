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
import { ReactNode } from 'react'

interface CollateralDataFormProps {
  form: ReturnType<typeof useCollateralForm>
  loanFormGroup: ReactNode
}

const CollateralDataForm = ({
  form,
  loanFormGroup,
}: CollateralDataFormProps) => (
  <Form className="h-full" form={form}>
    <FormRow>
      <FormGroup label="Título" name="title" input={Input} />
    </FormRow>
    <FormRow>
      <FormGroup label="Valor" name="value" input={CurrencyInput} />
      {loanFormGroup}
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

export default CollateralDataForm
