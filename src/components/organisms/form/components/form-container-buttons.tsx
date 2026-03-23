import { type FieldValues } from 'react-hook-form'
import FormSubmitBtn from './form-submit-btn'
import type { FormSubmitBtnProps } from './form-submit-btn'
import { UseFormReturn } from '../hooks/useFormMethods'
import FormResetBtn from './form-reset-btn'

type FormContainerButtonsProps<T extends FieldValues> =
  Partial<FormSubmitBtnProps> & {
    text?: string
    form: UseFormReturn<T>
    initializeAsDirty?: boolean
    onReset?: () => void
  }

const FormContainerButtons = <T extends FieldValues>({
  form: { control, reset },
  text,
  initializeAsDirty,
  onReset = reset,
  icon,
}: FormContainerButtonsProps<T>) => {
  return (
    <div className="flex items-center gap-3">
      <FormResetBtn control={control} onReset={onReset} />
      <FormSubmitBtn
        icon={icon}
        control={control}
        initializeAsDirty={initializeAsDirty}
      >
        {text}
      </FormSubmitBtn>
    </div>
  )
}

export default FormContainerButtons
