import type { IconName } from '@/components/atoms/icon/models/iconName'
import {
  AccentPillBtn,
  ButtonProps,
  CheckCircleIcon,
  Icon,
} from '@/components/atoms'

export interface FormSubmitBtnProps extends ButtonProps {
  isDirty?: boolean
  isValid?: boolean
  toastMessage?: string
  icon?: IconName
}

const FormSubmitBtn = ({
  children = 'Confirmar',
  isDirty,
  isValid,
  icon = CheckCircleIcon,
  ...props
}: FormSubmitBtnProps) => {
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
