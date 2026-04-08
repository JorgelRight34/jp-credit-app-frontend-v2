import { ReactNode, useState } from 'react'
import { FormLayout } from '../../form'
import { UseDeferredFileAttachmentsFormReturn } from '../models/useDeferredFileAttachmentsFormReturn'
import { FileAttachmentsPanel } from '../../file-attachments-panel'
import FileAttachmentsForm from './file-attachments-form'
import { UseFileAttachmentsReturn } from '../hooks/useFileAttachments'
import {
  AccentPillBtn,
  CheckCircleIcon,
  Icon,
  RestartAllIcon,
  SecondaryPillBtn,
} from '@/components/atoms'

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
        <div className="flex items-center gap-3">
          <SecondaryPillBtn
            disabled={!isDirty}
            onClick={() => form.handleReset()}
          >
            <Icon icon={RestartAllIcon}>Resetear</Icon>
          </SecondaryPillBtn>
          <AccentPillBtn type="submit" disabled={!isDirty}>
            <Icon icon={CheckCircleIcon}>Confirmar</Icon>
          </AccentPillBtn>
        </div>
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
