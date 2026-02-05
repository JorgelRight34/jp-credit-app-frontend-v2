import type { UseFormBuilderReturn } from '../models/useFormBuilderReturn'
import type { FieldValues } from 'react-hook-form'
import type { IconName } from '@/components/atoms/icon/iconName'
import { AccentBtn, CheckCircleIcon } from '@/components/atoms'
import { useDataMutation } from '@/hooks/useMutate'

export interface FormSubmitBtnProps<T extends FieldValues> {
  form?: UseFormBuilderReturn<T>
  text?: string
  isDirty?: boolean
  icon?: IconName
  onSubmit?: (...args: Array<unknown>) => unknown
}

const FormSubmitBtn = <T extends FieldValues>({
  form,
  text = 'Confirmar',
  isDirty,
  icon = CheckCircleIcon,
  onSubmit,
}: FormSubmitBtnProps<T>) => {
  const { mutateAsync } = useDataMutation({
    mutationFn:
      form?.form.handleSubmit ?? (() => onSubmit!() as Promise<unknown>),
  })

  return (
    <AccentBtn
      type="submit"
      disabled={!isDirty}
      icon={icon}
      onClick={mutateAsync}
    >
      {text}
    </AccentBtn>
  )
}

export default FormSubmitBtn
