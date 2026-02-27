import clsx from 'clsx'
import { Activity, useState } from 'react'
import { Form, FormInput } from '../../form'
import { WIDTH_CLASS_MAP } from '../lib/constants'
import type { PropsWithChildren } from 'react'
import type { DefaultFormValues, SchemaType, UseFormReturn } from '../../form'
import type { SearchFormOption } from '../models/searchFormOption'
import type { Query } from '../models/query'
import {
  AccentBtn,
  FormLabel,
  LightBtn,
  LightPillBtn,
  MenuIcon,
  RestoreIcon,
  SearchIcon,
} from '@/components/atoms'
import { FieldValues, useFormState } from 'react-hook-form'
import { useSearchFormSubmit } from '../providers/search-form-provider'
import { useFormMethods } from '../../form/hooks/useFormMethods'

interface SearchFormProps<T extends Query> {
  options: Array<SearchFormOption<T>>
  advanced: Array<SearchFormOption<T>>
  schema?: SchemaType<T>
  defaultValues?: DefaultFormValues<T>
  initialValues?: Partial<T>
}

const SearchForm = <T extends Query>({
  options,
  advanced,
  schema,
  defaultValues,
  initialValues,
}: SearchFormProps<T>) => {
  const onSubmit = useSearchFormSubmit()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [hasOpenedAdvanced, setHasOpenedAdvanced] = useState(false)
  const form = useFormMethods({
    schema,
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    } as DefaultFormValues<T>,
    handleOnSubmit: onSubmit,
  })

  return (
    <Form form={form}>
      <section className="py-1">
        <div className="flex flex-col items-center overflow-y-visible">
          <div className="flex w-full min-w-0">
            <div className="flex flex-1 min-w-0 items-center">
              {options.map((option) => (
                <SearchFormGroupContainer
                  width={option.width}
                  key={option.name as string}
                >
                  <FormInput
                    label={option.label}
                    className="w-full min-w-0"
                    name={option.name as string}
                    as={option.type}
                  />
                </SearchFormGroupContainer>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-1 pl-1">
              <SubmitBtn form={form} />
              <LightBtn
                icon={MenuIcon}
                className={`border shadow-sm ${advanced.length > 0 ? '' : 'opacity-50 cursor-not-allowed'}`}
                type="button"
                onClick={() => {
                  if (advanced.length > 0) {
                    setShowAdvanced((prev) => !prev)
                    if (!hasOpenedAdvanced) setHasOpenedAdvanced(true)
                  }
                }}
              />
            </div>
          </div>
          <Activity mode={showAdvanced ? 'visible' : 'hidden'}>
            <div className="rounded-xl flex-col flex mt-3 flex w-full flex-wrap space-y-3 shadow-sm border bg-white p-3">
              <div className="flex-1">
                {hasOpenedAdvanced &&
                  advanced.map((option) => (
                    <AdvancedSearchFormGroup
                      option={option}
                      key={option.name as string}
                    />
                  ))}
              </div>
              <div className="flex justify-end flex-shrink-0 border-t pt-3">
                <LightPillBtn
                  className="!w-auto"
                  icon={RestoreIcon}
                  onClick={() => form.reset()}
                >
                  Resetear
                </LightPillBtn>
              </div>
            </div>
          </Activity>
        </div>
      </section>
    </Form>
  )
}

const SubmitBtn = <T extends FieldValues>({
  form,
}: {
  form: UseFormReturn<T>
}) => {
  const { isDirty } = useFormState({ control: form.control })

  return (
    <AccentBtn
      disabled={!isDirty}
      icon={SearchIcon}
      className="shadow-sm"
      onClick={form.submit}
    />
  )
}

const AdvancedSearchFormGroup = <T,>({
  option,
}: {
  option: SearchFormOption<T>
}) => {
  return (
    <SearchFormGroupContainer width={option.width}>
      <div className="flex flex-1 items-start flex-col gap-2">
        <FormLabel htmlFor={option.name as string}>
          {option.label} <span className="text-accent">&nbsp;*&nbsp;</span>
        </FormLabel>
        <FormInput
          className="w-full"
          name={option.name as string}
          as={option.type}
        />
      </div>
    </SearchFormGroupContainer>
  )
}

const SearchFormGroupContainer = ({
  width,
  children,
}: { width: number } & PropsWithChildren) => {
  return <div className={clsx('px-1', WIDTH_CLASS_MAP[width])}>{children}</div>
}

export default SearchForm
