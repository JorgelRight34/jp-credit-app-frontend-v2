import {
  FieldValues,
  Path,
  useFormContext,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form'
import { LazySelect, SelectOptions } from '@/components/atoms'
import { CacheKey } from '@/models'
import FormGroupLayout, { FormGroupLabel } from './fom-group-layout'
import FormInput from './form-input'
import { FormGroupProps } from './form-group'
import { useMemo } from 'react'

type WatchValues = Array<string | number>

interface FormLazySelectGroupProps<T extends FieldValues> extends Omit<
  FormGroupProps<T>,
  'input'
> {
  watchedValues: ReadonlyArray<Path<T>>
  allowNoOption?: boolean
  enabledFn: (values: WatchValues) => boolean
  buildCacheKey: (values: WatchValues) => CacheKey
  loader: (
    values: WatchValues,
    setValue: UseFormSetValue<T>,
  ) => Promise<SelectOptions>
}

const FormLazySelectGroup = <T extends FieldValues>({
  allowNoOption,
  watchedValues,
  label,
  name,
  optional,
  enabledFn,
  buildCacheKey,
  loader,
  ...props
}: FormLazySelectGroupProps<T>) => {
  const { control, setValue } = useFormContext<T>()
  const watch = useWatch({
    name: watchedValues,
    control,
  })
  const enabled = useMemo(() => enabledFn(watch), [watch])

  return (
    <FormGroupLayout
      label={<FormGroupLabel label={label} optional={optional} />}
      name={name}
      {...props}
    >
      <FormInput
        name={name}
        as={(inputProps) => (
          <LazySelect
            cacheKey={buildCacheKey(watch)}
            loader={() => loader(watch, setValue)}
            enabled={enabled}
            disabled={!enabled}
            allowNoOption={allowNoOption}
            {...inputProps}
          />
        )}
      />
    </FormGroupLayout>
  )
}

export default FormLazySelectGroup
