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
  icon?: IconName
}

const FormSubmitBtn = ({
  children = 'Confirmar',
  isValid,
  control,
  icon = CheckCircleIcon,
  ...props
}: FormSubmitBtnProps) => {
  const { isDirty } = useFormState({ control })

  return (
    <AccentPillBtn
      type="submit"
      disabled={isValid !== undefined ? !isDirty || !isValid : !isDirty}
      {...props}
    >
      <Icon icon={icon}>{children}</Icon>
    </AccentPillBtn>
  )
}

export default FormSubmitBtn
