import type { IconName } from '@/components/atoms/icon/models/iconName'
import {
  AccentPillBtn,
  ButtonProps,
  CheckCircleIcon,
  Icon,
} from '@/components/atoms'
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
  text = 'Confirmar',
  children,
  isValid,
  control,
  initializeAsDirty,
  icon = CheckCircleIcon,
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
      {children ?? <Icon icon={icon}>{text}</Icon>}
    </AccentPillBtn>
  )
}

export default FormSubmitBtn
