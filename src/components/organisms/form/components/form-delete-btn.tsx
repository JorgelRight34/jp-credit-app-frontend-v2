import type { FieldValues } from 'react-hook-form'
import type { UseFormBuilderReturn } from '../models/useFormBuilderReturn'
import { SecondaryBtn } from '@/components/atoms'
import { useDataMutation } from '@/hooks/useMutate'

interface FormDeleteBtnProps<T extends FieldValues> {
  form?: UseFormBuilderReturn<T>
  text?: string
  onDelete?: (...args: Array<unknown>) => unknown
}

const FormDeleteBtn = <T extends FieldValues>({
  form,
  text = 'Borrar',
  onDelete,
}: FormDeleteBtnProps<T>) => {
  const { mutateAsync } = useDataMutation({
    mutationFn:
      form?.form.handleDelete ?? (() => onDelete!() as Promise<unknown>),
  })

  return (
    <SecondaryBtn className="w-full" icon="close" onClick={mutateAsync}>
      {text}
    </SecondaryBtn>
  )
}

export default FormDeleteBtn
