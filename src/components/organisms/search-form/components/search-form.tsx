import clsx from 'clsx'
import { Activity, useState } from 'react'
import { Form, FormGroup, FormInput, useForm } from '../../form'
import { WIDTH_CLASS_MAP } from '../lib/constants'
import type { PropsWithChildren } from 'react'
import type { SchemaType } from '../../form'
import type { SearchFormOption } from '../models/searchFormOption'
import type { Query } from '../models/query'
import { AccentBtn, LightBtn, MenuIcon, SearchIcon } from '@/components/atoms'

interface SearchFormProps<T extends Query> {
  options: Array<SearchFormOption<T>>
  advanced: Array<SearchFormOption<T>>
  schema?: SchemaType<T>
  initialValues?: Partial<T>
  onSubmit: (q: T) => Promise<T>
}

const SearchForm = <T extends Query>({
  options,
  advanced,
  schema,
  initialValues,
  onSubmit,
}: SearchFormProps<T>) => {
  const [isDirty, setIsDirty] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [hasOpenedAdvanced, setHasOpenedAdvanced] = useState(false)
  const form = useForm({
    schema,
    defaultValues: initialValues,
    resetValues: false,
    onSubmit,
    onDirtyChange: setIsDirty,
  })

  return (
    <Form form={form}>
      <section className="py-1">
        <div className="flex flex-col items-center overflow-y-visible">
          <div className="flex w-full !overflow-y-visible">
            <div className="flex w-12/13 items-center !overflow-y-visible">
              {options.map((option) => (
                <SearchFormGroupContainer
                  width={option.width}
                  key={option.name.toString()}
                >
                  <FormInput
                    label={option.label}
                    className="w-full"
                    name={option.name as string}
                    as={option.type}
                  />
                </SearchFormGroupContainer>
              ))}
            </div>
            <div className="flex w-1/13 items-center gap-1">
              <AccentBtn
                disabled={!isDirty}
                icon={SearchIcon}
                className="shadow-sm"
                onClick={form.form.handleSubmit}
              />
              <LightBtn
                icon={MenuIcon}
                className="border shadow-sm"
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
            <div className="rounded-xl mt-3 flex w-full flex-wrap  space-y-3 shadow-sm border bg-white p-3">
              {hasOpenedAdvanced &&
                advanced.map((option) => (
                  <SearchFormGroupContainer
                    width={option.width}
                    key={option.name.toString()}
                  >
                    <FormGroup
                      label={option.label}
                      name={option.name as string}
                      input={option.type}
                    />
                  </SearchFormGroupContainer>
                ))}
            </div>
          </Activity>
        </div>
      </section>
    </Form>
  )
}

const SearchFormGroupContainer = ({
  width,
  children,
}: { width: number } & PropsWithChildren) => {
  return <div className={clsx('px-1', WIDTH_CLASS_MAP[width])}>{children}</div>
}

export default SearchForm
