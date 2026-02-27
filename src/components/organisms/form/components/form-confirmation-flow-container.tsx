import {
  AccentPillBtn,
  ArrowForwardIcon,
  FormErrorsPanel,
  FormLayout,
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
}: FormConfirmationFlowContainerProps<T>) => {
  const { isDirty, errors } = useFormState({ control: form.control })

  return (
    <FormLayout
      footer={
        <FormConfirmationButtons
          isDirty={isDirty || initializeAsDirty === true}
          form={form}
        />
      }
      errors={<FormErrorsPanel control={form.control} mutationError={errors} />}
    >
      {children}
    </FormLayout>
  )
}

const FormConfirmationButtons = <T extends FieldValues>({
  isDirty,
  form,
}: FormConfirmationFlowContainerProps<T>) => {
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
      <SecondaryPillBtn
        icon={RestartAllIcon}
        disabled={!isDirty}
        onClick={form.reset}
      >
        Resetear
      </SecondaryPillBtn>
      <AccentPillBtn
        disabled={!isDirty}
        icon={ArrowForwardIcon}
        onClick={handleOnSubmit}
      >
        Continuar
      </AccentPillBtn>
    </div>
  )
}

export default FormConfirmationFlowContainer
