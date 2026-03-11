import { ReactNode, useState } from 'react'
import { FormContainerButtons, FormLayout } from '../../form'
import { UseDeferredFileAttachmentsFormReturn } from '../models/useDeferredFileAttachmentsFormReturn'
import { FileAttachmentsPanel } from '../../file-attachments-panel'
import FileAttachmentsForm from './file-attachments-form'
import { UseFileAttachmentsReturn } from '../hooks/useFileAttachments'

interface FileAttachmentsFormContainerProps<T> {
  render: (methods: UseFileAttachmentsReturn) => ReactNode
  form: UseDeferredFileAttachmentsFormReturn<T>
}

const FileAttachmentsFormContainer = <T,>({
  form,
}: FileAttachmentsFormContainerProps<T>) => {
  const [isDirty, setIsDirty] = useState(false)

  return (
    <FormLayout
      onSubmit={form.handleSubmit}
      footer={
        <FormContainerButtons isDirty={isDirty} onReset={form.handleReset} />
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

export default FileAttachmentsFormContainer
