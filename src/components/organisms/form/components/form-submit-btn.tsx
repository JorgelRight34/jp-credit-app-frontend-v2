import type { IconName } from '@/components/atoms/icon/iconName'
import { AccentBtn, CheckCircleIcon } from '@/components/atoms'

export interface FormSubmitBtnProps {
  text?: string
  isDirty?: boolean
  isValid?: boolean
  toastMessage?: string;
  icon?: IconName
  onSubmit?: () => unknown
}

const FormSubmitBtn =({
  text = 'Confirmar',
  isDirty,
  isValid,
  icon = CheckCircleIcon,
  onSubmit,
}: FormSubmitBtnProps) => {
    return (<AccentBtn
      type="submit"
      disabled={isValid !== undefined ? !isDirty || !isValid : !isDirty}
      icon={icon}
      onClick={onSubmit}
    >
      {text}
    </AccentBtn>
  )
}

export default FormSubmitBtn
