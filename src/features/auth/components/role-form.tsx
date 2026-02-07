import { Suspense, useRef, useState } from 'react'
import { useRoleForm } from '../hooks/useRoleForm'
import { updateRoleClaims } from '../services/authService'
import PermissionsForm from './permissions-form'
import type { PermissionsFormRef } from './permissions-form'
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

interface RoleFormProps extends DataModuleFormProps<
  Role,
  RoleFormSchemaValues
> {
  role: Role
}

const RoleForm = (props: RoleFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const permissionFormRef = useRef<PermissionsFormRef>(null)
  const form = useRoleForm({
    ...props,
    onSuccess: (data) => {
      permissionFormRef.current?.setValue('id', data.id)
      permissionFormRef.current?.submit()
    },
    onDirtyChange: setIsDirty,
  })

  return (
    <FormContainer footer={<FormSubmitBtn isDirty={isDirty} form={form} />}>
      <Form form={form}>
        <FormGroup name="name" label="Nombre" input={Input} />
      </Form>
      <Suspense fallback="...">
        <PermissionsForm ref={permissionFormRef} handler={updateRoleClaims} />
      </Suspense>
    </FormContainer>
  )
}

export default RoleForm
