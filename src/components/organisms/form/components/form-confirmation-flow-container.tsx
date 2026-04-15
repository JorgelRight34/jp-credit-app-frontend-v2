import {
  AccentPillBtn,
  ArrowForwardIcon,
  FormErrorsPanel,
  FormLayout,
  Icon,
  RestartAllIcon,
  SecondaryPillBtn,
  UseFormReturn,
} from '@/components'
import { PropsWithChildren } from 'react'
import { FieldValues, useFormState } from 'react-hook-form'
import {
  useFormConfirmationFlowActiveStep,
  useFormConfirmationFlowData,
} from '../providers/form-confirmation-provider'

interface FormConfirmationFlowContainerProps<
  T extends FieldValues,
> extends PropsWithChildren {
  form: UseFormReturn<T>
  initializeAsDirty?: boolean
  isDirty?: boolean
}

const FormConfirmationFlowContainer = <T extends FieldValues>({
  children,
  initializeAsDirty,
  form,
}: FormConfirmationFlowContainerProps<T>) => (
  <FormLayout
    footer={
      <FormConfirmationButtons
        form={form}
        initializeAsDirty={initializeAsDirty}
      />
    }
    errors={<FormErrorsPanel control={form.control} />}
  >
    {children}
  </FormLayout>
)

export const FormConfirmationButtons = <T extends FieldValues>({
  initializeAsDirty,
  form,
}: FormConfirmationFlowContainerProps<T>) => {
  const { isDirty } = useFormState({ control: form.control })
  const isReallyDirty = isDirty || initializeAsDirty

  const [_, setActive] = useFormConfirmationFlowActiveStep()
  const [__, setData] = useFormConfirmationFlowData()

  const handleOnSubmit = () => {
    form.handleSubmit((data) => {
      setData(data)
      setActive(1)
    })()
  }

  return (
    <div className="flex items-center gap-3">
      <SecondaryPillBtn disabled={!isReallyDirty} onClick={form.reset}>
        <Icon icon={RestartAllIcon}>Resetear</Icon>
      </SecondaryPillBtn>
      <AccentPillBtn disabled={!isReallyDirty} onClick={handleOnSubmit}>
        <Icon icon={ArrowForwardIcon}>Continuar</Icon>
      </AccentPillBtn>
    </div>
  )
}

export default FormConfirmationFlowContainer
