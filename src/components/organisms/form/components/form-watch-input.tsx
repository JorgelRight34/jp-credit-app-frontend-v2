import FormInput from './form-input'
import type { FieldValues } from 'react-hook-form'
import type { FormInputProps } from './form-input'
import FormWatchContainer, {
  FormWatchContainerProps,
} from './form-watch-container'

export type FormWatchInputProps<T extends FieldValues> = FormInputProps<T> &
  FormWatchContainerProps<T>

const FormWatchInput = <T extends FieldValues>({
  watchedValues,
  onWatchedValuesChange,
  ...props
}: FormWatchInputProps<T>) => {
  return (
    <FormWatchContainer
      watchedValues={watchedValues}
      onWatchedValuesChange={onWatchedValuesChange}
    >
      <FormInput {...props} />
    </FormWatchContainer>
  )
}

export default FormWatchInput
