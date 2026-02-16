import { useState } from 'react'
import { useCollateralFileAttachmentForm } from '../hooks/useCollateralFileAttachmentsForm'
import type { Collateral } from '../models/collateral'
import {
  FileAttachmentsForm,
  FormContainerButtons,
  FormLayout,
} from '@/components'
import { FileAttachmentsPanel } from '@/components/organisms/file-attachments-panel'

interface CollateralEditFilesForm {
  collateral: Collateral
}

const CollateralEditFilesForm = ({ collateral }: CollateralEditFilesForm) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useCollateralFileAttachmentForm({ collateral })

  return (
    <FormLayout
      footer={
        <FormContainerButtons
          isDirty={isDirty}
          onSubmit={() => form.formRef.current?.submit()}
        />
      }
    >
      <FileAttachmentsForm
        ref={form.formRef}
        form={form.form}
        onDirtyChange={setIsDirty}
        render={FileAttachmentsPanel}
      />
    </FormLayout>
  )
}

export default CollateralEditFilesForm
