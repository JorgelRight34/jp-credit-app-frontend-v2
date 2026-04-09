import { forwardRef, useImperativeHandle } from 'react'
import { useFileAttachmentsForm } from '../hooks/useFileAttachmentsForm'
import { useFileAttachments } from '../hooks/useFileAttachments'
import type { UseFileAttachmentsReturn } from '../hooks/useFileAttachments'
import type { ReactNode } from 'react'
import type { UseFileAttachmentsFormProps } from '../hooks/useFileAttachmentsForm'

export interface FileAttachmentsFormProps {
  resetFlag?: boolean
  form: UseFileAttachmentsFormProps
  isDirty?: boolean
  render: (
    methods: UseFileAttachmentsReturn & { isDirty?: boolean },
  ) => ReactNode
  onDirtyChange?: (isDirty: boolean) => void
}

export type FileAttachmentsFormRef = {
  submit: () => void
  reset: () => void
}

const FileAttachmentsForm = forwardRef(
  (
    { form, isDirty, onDirtyChange, render }: FileAttachmentsFormProps,
    ref: React.Ref<FileAttachmentsFormRef>,
  ) => {
    const config = useFileAttachmentsForm(form)
    const methods = useFileAttachments(config, onDirtyChange)

    useImperativeHandle(ref, () => ({
      submit: config.onSubmit,
      reset: config.reset,
    }))

    return render({ isDirty, ...methods })
  },
)

FileAttachmentsForm.displayName = 'FileAttachmentsForm'

export default FileAttachmentsForm
