import { type FieldValues } from 'react-hook-form'
import FormSubmitBtn from './form-submit-btn'
import type { FormSubmitBtnProps } from './form-submit-btn'
import { Icon, RestartAllIcon, SecondaryPillBtn } from '@/components/atoms'
import { UseFormReturn } from '../hooks/useFormMethods'

type FormContainerButtonsProps<T extends FieldValues> =
  Partial<FormSubmitBtnProps> & {
    text?: string
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
      <SecondaryPillBtn disabled={!isDirty} onClick={onReset}>
        <Icon icon={RestartAllIcon}>Resetear</Icon>
      </SecondaryPillBtn>
      <FormSubmitBtn icon={icon} isDirty={isDirty} isValid={isValid}>
        {text}
      </FormSubmitBtn>
    </div>
  )
}

export default FormContainerButtons
