import { useCallback } from 'react'
import type { FieldValues } from 'react-hook-form'
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
  isDirty,
  isValid,
  form,
  text,
  onSubmit,
  onReset,
  icon,
}: FormContainerButtonsProps<T>) => {
  const handleReset = useCallback(() => {
    if (form) {
      form.reset()
      return
    }
    onReset?.()
  }, [form, onReset])

  return (
    <div className="flex items-center gap-3">
      <SecondaryPillBtn
        icon={RestartAllIcon}
        disabled={!isDirty}
        onClick={handleReset}
      >
        Resetear
      </SecondaryPillBtn>
      <FormSubmitBtn
        isDirty={isDirty}
        isValid={isValid}
        icon={icon}
        text={text}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default FormContainerButtons
