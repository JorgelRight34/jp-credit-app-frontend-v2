import {
  buildFormWatchConsumer,
  FieldValues,
  FormWatchConsumerProps,
} from '@/components/organisms'
import { Select } from '../../..'
import { SelectInputProps } from '../select'
import { SelectOptions } from '../select-option'

export const withSelectOptions = <T extends string | number | null>(
  options: SelectOptions<T>,
) => {
  return (props: SelectInputProps) => Select({ ...props, options })
}

export const withFormWatchSelectOptions = <T extends FieldValues>(
  options: SelectOptions,
  formWatch: FormWatchConsumerProps<T>,
) => {
  return buildFormWatchConsumer(
    formWatch.watchedValues,
    formWatch.onWatchedValuesChange,
    (props: SelectInputProps) => Select({ ...props, options }),
  )
}
