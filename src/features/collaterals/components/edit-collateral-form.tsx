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
  FormReadOnlyGroup,
  Tab,
  Tabs,
} from '@/components'
import CollateralDataForm from './collateral-data-form'

interface EditCollateralFormProps extends DataModuleFormProps<
  Collateral,
  CollateralFormValues
> {
  collateral: Collateral
}

const EditCollateralForm = ({
  collateral,
  ...props
}: EditCollateralFormProps) => {
  const form = useCollateralForm({
    collateral,
    ...props,
  })

  return (
    <Tabs defaultActiveKey="data">
      <Tab eventKey="data" title="Datos">
        <FormContainer form={form}>
          <CollateralDataForm
            loanFormGroup={
              <FormReadOnlyGroup
                name="loanId"
                label="Préstamo"
                value={`Préstamo No.${collateral.loanId}`}
                disabled
              />
            }
            form={form}
          />
        </FormContainer>
      </Tab>
      <Tab eventKey="files" title="Archivos">
        <EditCollateralFileAttachmentsForm collateral={collateral} />
      </Tab>
    </Tabs>
  )
}

const EditCollateralFileAttachmentsForm = ({
  collateral,
}: EditCollateralFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const fileAttachmentsForm = useCollateralFileAttachmentForm({ collateral })

  return (
    <FormContainer
      footer={
        <FormContainerButtons
          isDirty={isDirty}
          onSubmit={fileAttachmentsForm.handleSubmit}
        />
      }
    >
      <FileAttachmentsForm
        ref={fileAttachmentsForm.formRef}
        form={fileAttachmentsForm.form}
        onDirtyChange={setIsDirty}
        render={FileAttachmentsPanel}
      />
    </FormContainer>
  )
}

export default EditCollateralForm
