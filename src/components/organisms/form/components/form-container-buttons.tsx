import FormSubmitBtn from './form-submit-btn'
import type { FieldValues } from 'react-hook-form'
import type { FormSubmitBtnProps } from './form-submit-btn'
import { SecondaryBtn } from '@/components/atoms'

type FormContainerButtonsProps<T extends FieldValues> =
  FormSubmitBtnProps<T> & {
    readOnly?: boolean
    onReset?: () => void
  }

const FormContainerButtons = <T extends FieldValues>({
  isDirty,
  isValid,
  form,
  text,
  readOnly,
  onSubmit,
  onReset,
  icon,
}: FormContainerButtonsProps<T>) => {
  if (readOnly) return null

  return (
    <div className="flex items-center gap-3">
      <SecondaryBtn
        disabled={!isDirty}
        onClick={() => (form ? form.form.reset() : onReset?.())}
      >
        Resetear
      </SecondaryBtn>
      <FormSubmitBtn
        isDirty={isDirty}
        isValid={isValid}
        icon={icon}
        text={text}
        form={form}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default FormContainerButtons
