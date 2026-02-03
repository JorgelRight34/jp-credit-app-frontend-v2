import { useState } from 'react'
import { useRoleForm } from '../hooks/useRoleForm'
import type { DataModuleFormProps } from '@/components'
import type { Role } from '../models/role'
import type { RoleFormSchemaValues } from '../lib/schemas/roleFormSchema'
import {
  Form,
  FormContainer,
  FormGroup,
  FormSubmitBtn,
  Input,
} from '@/components'

const RoleForm = (props: DataModuleFormProps<Role, RoleFormSchemaValues>) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useRoleForm({ ...props, onDirtyChange: setIsDirty })

  return (
    <Form form={form}>
      <FormContainer footer={<FormSubmitBtn isDirty={isDirty} />}>
        <FormGroup name="name" label="Nombre" input={Input} />
      </FormContainer>
    </Form>
  )
}

export default RoleForm
