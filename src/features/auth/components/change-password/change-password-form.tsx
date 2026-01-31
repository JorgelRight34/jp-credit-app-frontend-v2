import { useChangePasswordForm } from '../../hooks/useChangePassword'
import type { Ref } from 'react'
import type { ChangePasswordSchemaType } from '../../lib/schemas/changePasswordSchema'
import type { FormRef, UseDataModuleFormProps } from '@/components'
import { Form, FormGroup, PasswordInput } from '@/components'

export type ChangePasswordFormProps = UseDataModuleFormProps<
  null,
  ChangePasswordSchemaType
>

const ChangePasswordForm = ({
  initialValues,
  ref,
}: ChangePasswordFormProps) => {
  const form = useChangePasswordForm({ initialValues })

  return (
    <Form ref={ref as Ref<FormRef<ChangePasswordSchemaType>>} form={form}>
      <FormGroup name="password" label="Contraseña" input={PasswordInput} />
      <FormGroup
        name="confirmation"
        label="Confirmación"
        input={PasswordInput}
      />
    </Form>
  )
}

export default ChangePasswordForm
