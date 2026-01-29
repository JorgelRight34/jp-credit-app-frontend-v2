import type { UseFormBuilderReturn } from '../models/useFormBuilderReturn'
import type { FieldValues } from 'react-hook-form'
import type { IconName } from '@/components/atoms/icon/iconName'
import { AccentBtn, SendIcon } from '@/components/atoms'
import { useDataMutation } from '@/hooks/useMutate'

interface FormSubmitBtnProps<T extends FieldValues> {
  form?: UseFormBuilderReturn<T>
  text?: string
  icon?: IconName
  isDirty?: boolean
  onSubmit?: (...args: Array<unknown>) => unknown
}

const FormSubmitBtn = <T extends FieldValues>({
  form,
  text = 'Ok',
  icon = SendIcon,
  isDirty,
  onSubmit,
}: FormSubmitBtnProps<T>) => {
  const { mutateAsync } = useDataMutation({
    mutationFn:
      form?.form.handleSubmit ?? (() => onSubmit!() as Promise<unknown>),
  })

  return (
    <AccentBtn disabled={!isDirty} icon={icon} onClick={mutateAsync}>
      {text}
    </AccentBtn>
  )
}

export default FormSubmitBtn
