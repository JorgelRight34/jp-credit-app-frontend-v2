import { useState } from 'react'
import { useCollateralForm } from '../hooks/useCollateralForm'
import { useCollateralFileAttachmentForm } from '../hooks/useCollateralFileAttachmentsForm'
import {
  collateralConditionsOptions,
  collateralTypeOptions,
} from '../lib/constants'
import type { DataModuleFormProps } from '@/components'
import type { Collateral } from '../models/collateral'
import type { CollateralFormValues } from '../lib/schemas/collateralFormSchema'
import {
  CurrencyInput,
  DateInput,
  FileAttachmentsForm,
  FileAttachmentsPanel,
  Form,
  FormContainer,
  FormContainerButtons,
  FormGroup,
  FormRow,
  FormSelectGroup,
  Input,
  RichTextEditor,
  Tab,
  Tabs,
} from '@/components'
import { LoanSearchInput } from '@/features/loans'

interface CollateralFormProps extends DataModuleFormProps<
  Collateral,
  CollateralFormValues
> {
  collateral?: Collateral
}

const CollateralForm = (props: CollateralFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const fileAttachmentsForm = useCollateralFileAttachmentForm({})
  const form = useCollateralForm({
    onDirtyChange: setIsDirty,
    onSuccess: fileAttachmentsForm.submit,
    ...props,
  })

  return (
    <FormContainer
      footer={<FormContainerButtons isDirty={isDirty} form={form} />}
    >
      <Tabs defaultActiveKey="data">
        <Tab eventKey="data" title="Datos">
          <Form form={form}>
            <FormRow>
              <FormGroup label="Título" name="title" input={Input} />
            </FormRow>
            <FormRow>
              <FormGroup label="Valor" name="value" input={CurrencyInput} />
              <FormGroup
                name="loanId"
                label="Préstamo"
                input={LoanSearchInput}
              />
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
              <FormGroup
                name="location"
                label="Localidad"
                input={Input}
                optional
              />
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
        </Tab>
        <Tab eventKey="files" title="Archivos">
          <FileAttachmentsForm
            ref={fileAttachmentsForm.formRef}
            form={fileAttachmentsForm.form}
            render={FileAttachmentsPanel}
          />
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default CollateralForm
