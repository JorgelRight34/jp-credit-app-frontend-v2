import type { IconName } from '@/components/atoms/icon/models/iconName'
import { AccentPillBtn, ButtonProps } from '@/components/atoms'
import { Control, useFormState } from 'react-hook-form'

export interface FormSubmitBtnProps extends ButtonProps {
  isDirty?: boolean
  isValid?: boolean
  toastMessage?: string
  control: Control<any, any, any>
  initializeAsDirty?: boolean
  text?: string
  icon?: IconName
}

const FormSubmitBtn = ({
  children = 'Confirmar',
  isValid,
  control,
  initializeAsDirty,
  ...props
}: FormSubmitBtnProps) => {
  const { isDirty } = useFormState({ control })
  const isReallyDirty = isDirty || initializeAsDirty

  return (
    <AccentPillBtn
      type="submit"
      disabled={
        isValid !== undefined ? !isReallyDirty || !isValid : !isReallyDirty
      }
      {...props}
    >
      {children}
    </AccentPillBtn>
  )
}

export default FormSubmitBtn
