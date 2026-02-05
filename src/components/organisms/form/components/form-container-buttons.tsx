import FormSubmitBtn from './form-submit-btn'
import type { FieldValues } from 'react-hook-form'
import type { FormSubmitBtnProps } from './form-submit-btn'
import { SecondaryBtn } from '@/components/atoms'

type FormContainerButtonsProps<T extends FieldValues> = FormSubmitBtnProps<T>

const FormContainerButtons = <T extends FieldValues>({
  isDirty,
  icon,
  text,
  onSubmit,
  form,
}: FormContainerButtonsProps<T>) => {
  return (
    <div className="flex items-center gap-3">
      <SecondaryBtn disabled={!isDirty} onClick={() => form?.form.reset()}>
        Resetear
      </SecondaryBtn>
      <FormSubmitBtn
        isDirty={isDirty}
        icon={icon}
        text={text}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default FormContainerButtons
