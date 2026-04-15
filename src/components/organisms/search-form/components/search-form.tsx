import { Activity, useCallback, useState } from 'react'
import { Form, FormInput } from '../../form'
import type { PropsWithChildren } from 'react'
import type { DefaultFormValues, SchemaType } from '../../form'
import type { SearchFormOption } from '../models/searchFormOption'
import type { Query } from '../models/query'
import {
  AccentBtn,
  AccentPillBtn,
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
import { useSearchFormSubmit } from '../providers/search-form-provider'
import { useFormMethods } from '../../form/hooks/useFormMethods'
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

  const onShowAdvancedClick = useCallback(() => {
    setShowAdvanced((prev) => !prev)
    if (!hasOpenedAdvanced) setHasOpenedAdvanced(true)
  }, [])

  return (
    <Form form={form}>
      <section className="flex flex-col items-center overflow-y-visible py-1">
        <div className="flex w-full min-w-0 md:flex-row">
          <QuickSearchForm
            options={options}
            form={form}
            onShowAdvancedClick={onShowAdvancedClick}
          />
        </div>
        <Activity mode={showAdvanced ? 'visible' : 'hidden'}>
          {hasOpenedAdvanced && (
            <AdvancedSearchForm
              options={advanced}
              form={form}
              onExport={onExport}
            />
          )}
        </Activity>
      </section>
    </Form>
  )
}

const QuickSearchForm = <T,>({
  options,
  form,
  onShowAdvancedClick,
}: {
  options: Array<SearchFormOption<T>>
  form: ReturnType<typeof useFormMethods>
  onShowAdvancedClick: () => void
}) => (
  <>
    <div className="flex min-w-0 flex-1 flex-col items-center gap-3 md:flex-row md:gap-0">
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
      <AccentBtn
        className="!hidden h-full shadow-sm md:!block"
        onClick={form.submit}
      >
        <Icon icon={SearchIcon} />
      </AccentBtn>
      <LightBtn
        className="h-full border shadow-sm"
        type="button"
        onClick={onShowAdvancedClick}
      >
        <Icon icon={MenuIcon} />
      </LightBtn>
    </div>
  </>
)

const AdvancedSearchForm = <T,>({
  options,
  form,
  onExport,
}: {
  options: Array<SearchFormOption<T>>
  form: ReturnType<typeof useFormMethods>
  onExport?: ExportHandler<T>
}) => (
  <div className="bg-surface mt-3 flex w-full flex-col rounded-xl border shadow-sm">
    <div className="flex flex-1 flex-wrap space-y-3 p-3">
      {options.map((option) => (
        <AdvancedSearchFormGroup option={option} key={option.name as string} />
      ))}
      {options.length === 0 && <Paragraph>No hay opciones</Paragraph>}
    </div>
    <div className="flex flex-shrink-0 flex-wrap justify-end gap-3 border-t p-3">
      <AccentPillBtn className="w-full md:!w-auto" onClick={form.submit}>
        <Icon icon={SearchIcon}>Buscar</Icon>
      </AccentPillBtn>
      {onExport && (
        <ModalTrigger
          title={<Icon icon={SettingsIcon}>Configurar exporte</Icon>}
          modalClassName="w-[90dvw] md:w-auto"
          triggerClassName="w-full md:!w-auto"
          trigger={
            <LightPillBtn>
              <Icon icon={DownloadIcon}>Exportar</Icon>
            </LightPillBtn>
          }
        >
          <ExportForm onSubmit={(body) => onExport!(body, form.getValues())} />
        </ModalTrigger>
      )}
      <LightPillBtn className="w-full md:!w-auto" onClick={() => form.reset()}>
        <Icon icon={RestoreIcon}>Resetear</Icon>
      </LightPillBtn>
    </div>
  </div>
)

const AdvancedSearchFormGroup = <T,>({
  option,
}: {
  option: SearchFormOption<T>
}) => (
  <SearchFormGroupContainer width={option.width}>
    <div className="flex flex-1 flex-col items-start gap-2">
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

const widths = [
  '',
  'md:!w-1/12',
  'md:!w-2/12',
  'md:!w-3/12',
  'md:!w-4/12',
  'md:!w-5/12',
  'md:!w-6/12',
  'md:!w-7/12',
  'md:!w-8/12',
  'md:!w-9/12',
  'md:!w-10/12',
  'md:!w-11/12',
  'md:!w-12/12',
]

const SearchFormGroupContainer = ({
  width = 12,
  children,
}: { width: number } & PropsWithChildren) => {
  return <div className={`w-full px-1 ${widths[width]}`}>{children}</div>
}

export default SearchForm
