import { Activity, useState } from 'react'
import { Form, FormInput, useHasFormEverBeenDirty } from '../../form'
import { WIDTH_CLASS_MAP } from '../lib/constants'
import type { PropsWithChildren } from 'react'
import type { DefaultFormValues, SchemaType } from '../../form'
import type { SearchFormOption } from '../models/searchFormOption'
import type { Query } from '../models/query'
import {
  AccentBtn,
  DownloadIcon,
  FormLabel,
  Icon,
  LightBtn,
  LightPillBtn,
  MenuIcon,
  Paragraph,
  RestoreIcon,
  SearchIcon,
  SettingsIcon,
} from '@/components/atoms'
import { FieldValues } from 'react-hook-form'
import { useSearchFormSubmit } from '../providers/search-form-provider'
import { useFormMethods, UseFormReturn } from '../../form/hooks/useFormMethods'
import { ModalTrigger } from '../../modal'
import { ExportForm, ExportHandler } from '@/components/molecules'

interface SearchFormProps<T extends Query> {
  options: Array<SearchFormOption<T>>
  advanced: Array<SearchFormOption<T>>
  schema?: SchemaType<T>
  defaultValues?: DefaultFormValues<T>
  onExport?: ExportHandler<T>
}

const SearchForm = <T extends Query>({
  options,
  advanced,
  schema,
  defaultValues,
  onExport,
}: SearchFormProps<T>) => {
  const onSubmit = useSearchFormSubmit()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [hasOpenedAdvanced, setHasOpenedAdvanced] = useState(false)
  const form = useFormMethods({
    schema,
    defaultValues,
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
                    id={option.name as string}
                    as={option.type}
                  />
                </SearchFormGroupContainer>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-1 pl-1">
              <SubmitBtn form={form} />
              <LightBtn
                icon={MenuIcon}
                className="border shadow-sm"
                type="button"
                onClick={() => {
                  setShowAdvanced((prev) => !prev)
                  if (!hasOpenedAdvanced) setHasOpenedAdvanced(true)
                }}
              />
            </div>
          </div>
          <Activity mode={showAdvanced ? 'visible' : 'hidden'}>
            <div className="rounded-xl flex-col flex mt-3 flex w-full shadow-sm border bg-surface">
              <div className="flex-1 flex flex-wrap space-y-3 p-3">
                {hasOpenedAdvanced &&
                  advanced.map((option) => (
                    <AdvancedSearchFormGroup
                      option={option}
                      key={option.name as string}
                    />
                  ))}
                {advanced.length === 0 && (
                  <Paragraph>No hay opciones</Paragraph>
                )}
              </div>
              <div className="flex justify-end flex-shrink-0 border-t gap-3 p-3">
                {onExport && (
                  <span>
                    <SearchFormExportBtn form={form} onExport={onExport} />
                  </span>
                )}
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
  const hasEverBeenDirty = useHasFormEverBeenDirty(form.control)

  return (
    <AccentBtn
      disabled={!hasEverBeenDirty}
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

const SearchFormExportBtn = <T extends Query>({
  form,
  onExport,
}: Pick<SearchFormProps<T>, 'onExport'> & {
  form: ReturnType<typeof useFormMethods>
}) => {
  return (
    <ModalTrigger
      title={<Icon icon={SettingsIcon}>Configurar exporte</Icon>}
      trigger={
        <LightPillBtn className="!w-auto" icon={DownloadIcon}>
          Exportar
        </LightPillBtn>
      }
    >
      <ExportForm onSubmit={(body) => onExport!(body, form.getValues())} />
    </ModalTrigger>
  )
}

const SearchFormGroupContainer = ({
  width,
  children,
}: { width: number } & PropsWithChildren) => {
  return (
    <div className={`px-1 w-full md:${WIDTH_CLASS_MAP[width]}`}>{children}</div>
  )
}

export default SearchForm
