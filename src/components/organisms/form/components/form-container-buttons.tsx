import { useCallback } from 'react'
import type { FieldValues } from 'react-hook-form'
import FormSubmitBtn from './form-submit-btn'
import type { FormSubmitBtnProps } from './form-submit-btn'
import { SecondaryBtn } from '@/components/atoms'
import { UseFormBuilderReturn } from '../models/useFormBuilderReturn'

type FormContainerButtonsProps<T extends FieldValues> =
  Omit<FormSubmitBtnProps, "onSubmit"> & {
    form: UseFormBuilderReturn<T>;
    shouldSubmitAll?: boolean
    resetOnSubmitOne?: boolean;
    onSubmitAll?: () => unknown
    onReset?: () => void
  }

const FormContainerButtons = <T extends FieldValues>({
  shouldSubmitAll = false,
  resetOnSubmitOne=true,
  isDirty,
  isValid,
  form,
  text,
  onSubmitAll,
  onReset,
  icon,
}: FormContainerButtonsProps<T>) => {
  const handleReset = useCallback(() => {
    if (form) {
      form.form.reset()
      return
    }
    onReset?.()
  }, [form, onReset])

  const submitHandler = useCallback(
    async () => {
      if (shouldSubmitAll) {
        await onSubmitAll?.();
      } else {
        await form?.form.handleSubmit()
        if (resetOnSubmitOne) onReset?.();
      } 
    },
    [shouldSubmitAll, onSubmitAll],
  )

  return (
    <div className="flex items-center gap-3">
      <SecondaryBtn disabled={!isDirty} onClick={handleReset}>
        Resetear
      </SecondaryBtn>
      <FormSubmitBtn
        isDirty={isDirty}
        isValid={isValid}
        icon={icon}
        text={text}
        onSubmit={submitHandler}
      />
    </div>
  )
}

export default FormContainerButtons
