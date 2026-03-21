import { FieldValues, useFormState } from 'react-hook-form'
import { PropsWithFormControl } from '../models/fomRef'
import { Icon, RestartAllIcon, SecondaryPillBtn } from '@/components/atoms'

const FormResetBtn = <T extends FieldValues>({
  control,
  onReset,
}: PropsWithFormControl<T, { onReset: () => void }>) => {
  const { isDirty } = useFormState({ control })

  return (
    <SecondaryPillBtn disabled={!isDirty} onClick={onReset}>
      <Icon icon={RestartAllIcon}>Resetear</Icon>
    </SecondaryPillBtn>
  )
}

export default FormResetBtn
