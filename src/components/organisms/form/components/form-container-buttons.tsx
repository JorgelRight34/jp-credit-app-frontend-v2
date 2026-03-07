import { type FieldValues } from 'react-hook-form'
import FormSubmitBtn from './form-submit-btn'
import type { FormSubmitBtnProps } from './form-submit-btn'
import { RestartAllIcon, SecondaryPillBtn } from '@/components/atoms'
import { UseFormReturn } from '../hooks/useFormMethods'

type FormContainerButtonsProps<T extends FieldValues> =
  Partial<FormSubmitBtnProps> & {
    form?: UseFormReturn<T>
    onReset?: () => void
  }

const FormContainerButtons = <T extends FieldValues>({
  form,
  text,
  isDirty,
  isValid,
  onReset = form?.reset,
  icon,
}: FormContainerButtonsProps<T>) => {
  return (
    <div className="flex items-center gap-3">
      <SecondaryPillBtn
        icon={RestartAllIcon}
        disabled={!isDirty}
        onClick={onReset}
      >
        Resetear
      </SecondaryPillBtn>
      <FormSubmitBtn
        icon={icon}
        text={text}
        isDirty={isDirty}
        isValid={isValid}
      />
    </div>
  )
}

export default FormContainerButtons
