import FormInput from './form-input'
import type { FieldValues } from 'react-hook-form'
import type { FormInputProps } from './form-input'
import FormWatchConsumer, {
  FormWatchConsumerProps,
} from './form-watch-consumer'

export type FormWatchInputProps<T extends FieldValues> = FormInputProps<T> &
  FormWatchConsumerProps<T>

const FormWatchInput = <T extends FieldValues>({
  watchedValues,
  onWatchedValuesChange,
  ...props
}: FormWatchInputProps<T>) => {
  return (
    <FormWatchConsumer
      watchedValues={watchedValues}
      onWatchedValuesChange={onWatchedValuesChange}
    >
      <FormInput {...props} />
    </FormWatchConsumer>
  )
}

export default FormWatchInput
