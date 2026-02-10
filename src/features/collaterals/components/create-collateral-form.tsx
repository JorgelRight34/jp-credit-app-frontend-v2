import { useState } from 'react'
import { useCollateralForm } from '../hooks/useCollateralForm'
import { useCollateralFileAttachmentForm } from '../hooks/useCollateralFileAttachmentsForm'
import type { DataModuleFormProps } from '@/components'
import type { Collateral } from '../models/collateral'
import type { CollateralFormValues } from '../lib/schemas/collateralFormSchema'
import {
  FileAttachmentsForm,
  FileAttachmentsPanel,
  FormContainer,
  FormContainerButtons,
  FormGroup,
  Tab,
  Tabs,
} from '@/components'
import CollateralDataForm from './collateral-data-form'
import { LoanSearchInput } from '@/features/loans'

interface CreateCollateralFormProps extends DataModuleFormProps<
  Collateral,
  CollateralFormValues
> {}

const CreateCollateralForm = (props: CreateCollateralFormProps) => {
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
          <CollateralDataForm
            loanFormGroup={
              <FormGroup
                name="loanId"
                label="Préstamo"
                input={LoanSearchInput}
              />
            }
            form={form}
          />
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

export default CreateCollateralForm
