import { useState } from 'react'
import { useCollateralForm } from '../hooks/useCollateralForm'
import { useCollateralFileAttachmentForm } from '../hooks/useCollateralFileAttachmentsForm'
import CollateralDataForm from './collateral-data-form'
import type { DataModuleFormProps } from '@/components'
import type { Collateral } from '../models/collateral'
import type { CollateralFormValues } from '../lib/schemas/collateralFormSchema'
import {
  FileAttachmentsForm,
  FormContainer,
  FormContainerButtons,
  Tab,
  Tabs,
} from '@/components'
import { FileAttachmentsPanel } from '@/components/organisms/file-attachments-panel'

const CollateralForm = (
  props: DataModuleFormProps<Collateral, CollateralFormValues>,
) => {
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
          <CollateralDataForm form={form} />
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
