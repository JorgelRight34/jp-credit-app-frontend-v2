import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useFileAttachmentsForm } from '../hooks/useFileAttachmentsForm'
import { useFileAttachments } from '../hooks/useFileAttachments'
import type {
  FileUploads,
  UseFileAttachmentsReturn,
} from '../hooks/useFileAttachments'
import type { FormRef } from '../../form'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { UseFileAttachmentsFormProps } from '../hooks/useFileAttachmentsForm'

export interface FileFormProps {
  resetFlag?: boolean
  form: UseFileAttachmentsFormProps
  render: (methods: UseFileAttachmentsReturn) => ReactNode
  onDirtyChange?: (isDirty: boolean) => void
}

export type FileAttachmentsFormRef = Omit<FormRef, 'control' | 'onChange'> & {
  onChange: Dispatch<SetStateAction<FileUploads>>
}

const FileAttachmentsForm = forwardRef(
  (
    { form, onDirtyChange, render }: FileFormProps,
    ref: React.Ref<FileAttachmentsFormRef>,
  ) => {
    const { reset, ...config } = useFileAttachmentsForm(form)
    const { isDirty, ...methods } = useFileAttachments(config)

    useEffect(() => {
      onDirtyChange?.(isDirty)
    }, [isDirty, onDirtyChange])

    useImperativeHandle(ref, () => ({
      isDirty: () => isDirty,
      reset,
      onChange: config.onChange,
      submit: () => config.onSubmit(),
      validate: async () => await Promise.resolve(true),
      applyInterceptors: (data) => data,
      setValue: () => {},
      getValues: () => [methods.upload, methods.remove],
    }))

    return render({ isDirty, ...methods })
  },
)

FileAttachmentsForm.displayName = 'FileAttachmentsForm'

export default FileAttachmentsForm
