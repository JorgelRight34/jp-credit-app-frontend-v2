import { Ref, Suspense, useRef } from 'react'
import { useRoleForm } from '../hooks/useRoleForm'
import { updateRoleClaims } from '../services/authService'
import type { DataModuleFormProps } from '@/components'
import type { Role } from '../models/role'
import type { RoleFormSchemaValues } from '../lib/schemas/roleFormSchema'
import { Form, FormContainer, FormGroup, FormInput, Input } from '@/components'
import {
  PermissionsFormRef,
  usePermissionsForm,
} from '../hooks/usePermissionsForm'
import PermissionsFormTransferList from './permissions-form-transfer-list'

interface RoleFormProps extends DataModuleFormProps<
  Role,
  RoleFormSchemaValues
> {
  role?: Role
}

const RoleForm = ({ role, ...props }: RoleFormProps) => {
  const permissionFormRef = useRef<PermissionsFormRef>(null)
  const form = useRoleForm({
    initialValues: role,
    shouldEdit: !!role,
    onSuccess: (data) => {
      permissionFormRef.current?.setValue('id', data.id)
      permissionFormRef.current?.submit()
    },
    toastMessage: (data) =>
      role
        ? `Se ha modificado el rol ${role?.name}`
        : `Se ha creado el rol (${data?.id}) [${data!.name}]`,
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormGroup name="name" label="Nombre" input={Input} />
      </Form>
      <Suspense fallback="...">
        <PermissionsForm ref={permissionFormRef} />
      </Suspense>
    </FormContainer>
  )
}

const PermissionsForm = ({ ref }: { ref: Ref<PermissionsFormRef> }) => {
  const form = usePermissionsForm({ handler: updateRoleClaims })

  return (
    <Form ref={ref} form={form}>
      <Suspense fallback="...">
        <FormInput name="claims" as={PermissionsFormTransferList} />
      </Suspense>
    </Form>
  )
}

export default RoleForm
