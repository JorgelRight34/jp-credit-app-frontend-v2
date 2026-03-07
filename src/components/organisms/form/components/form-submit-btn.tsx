import type { IconName } from '@/components/atoms/icon/models/iconName'
import { AccentPillBtn, CheckCircleIcon } from '@/components/atoms'

export interface FormSubmitBtnProps {
  text?: string
  isDirty?: boolean
  isValid?: boolean
  toastMessage?: string
  icon?: IconName
}

const FormSubmitBtn = ({
  text = 'Confirmar',
  isDirty,
  isValid,
  icon = CheckCircleIcon,
}: FormSubmitBtnProps) => {
  return (
    <AccentPillBtn
      type="submit"
      disabled={isValid !== undefined ? !isDirty || !isValid : !isDirty}
      icon={icon}
    >
      {text}
    </AccentPillBtn>
  )
}

export default FormSubmitBtn
