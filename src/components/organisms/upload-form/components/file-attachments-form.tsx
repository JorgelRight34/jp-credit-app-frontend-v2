import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useFileAttachmentsForm } from '../hooks/useFileAttachmentsForm'
import { useFileAttachments } from '../hooks/useFileAttachments'
import type { UseFileAttachmentsReturn } from '../hooks/useFileAttachments'
import type { ReactNode } from 'react'
import type { UseFileAttachmentsFormProps } from '../hooks/useFileAttachmentsForm'

export interface FileAttachmentsFormProps {
  resetFlag?: boolean
  form: UseFileAttachmentsFormProps
  render: (methods: UseFileAttachmentsReturn) => ReactNode
  onDirtyChange?: (isDirty: boolean) => void
}

export type FileAttachmentsFormRef = {
  submit: () => void
}

const FileAttachmentsForm = forwardRef(
  (
    { form, onDirtyChange, render }: FileAttachmentsFormProps,
    ref: React.Ref<FileAttachmentsFormRef>,
  ) => {
    const { reset, ...config } = useFileAttachmentsForm(form)
    const { isDirty, ...methods } = useFileAttachments(config)

    useEffect(() => {
      onDirtyChange?.(isDirty)
    }, [isDirty, onDirtyChange])

    useImperativeHandle(ref, () => ({
      submit: () => config.onSubmit(),
    }))

    return render({ isDirty, ...methods })
  },
)

FileAttachmentsForm.displayName = 'FileAttachmentsForm'

export default FileAttachmentsForm
