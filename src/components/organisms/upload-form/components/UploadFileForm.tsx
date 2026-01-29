import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useUploadFilesInput } from '../hooks/useUploadFilesInput'
import { useUploadFileForm } from '../hooks/useUploadFileForm'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { UseUploadFilesInputReturn } from '../models/useMultipleFilesInputProp'
import type { FileUploads } from '../hooks/useUploadFilesInput'
import type { UseUploadFileFormProps } from '../hooks/useUploadFileForm'
import type { FormBuilderRef } from '../../../../../bk/form-builder/models/formBuilder'

export interface FileFormProps extends UseUploadFileFormProps {
  resetFlag?: boolean
  render: (methods: UseUploadFilesInputReturn) => ReactNode
  onDirtyChange?: (isDirty: boolean) => void
}

export type UploadFileFormRef = Omit<FormBuilderRef, 'control' | 'onChange'> & {
  onChange: Dispatch<SetStateAction<FileUploads>>
}

const UploadFileForm = forwardRef(
  (
    { onDirtyChange, render, ...params }: FileFormProps,
    ref: React.Ref<UploadFileFormRef>,
  ) => {
    const { reset, ...config } = useUploadFileForm(params)
    const { isDirty, ...methods } = useUploadFilesInput(config)

    useEffect(() => {
      onDirtyChange?.(isDirty)
    }, [isDirty, onDirtyChange])

    useImperativeHandle(ref, () => ({
      isDirty,
      reset,
      onChange: config.onChange,
      submit: () => config.onSubmit,
      validate: () => true,
      setValue: () => {},
    }))

    return render({ isDirty, ...methods })
  },
)

UploadFileForm.displayName = 'UploadFileForm'

export default UploadFileForm
