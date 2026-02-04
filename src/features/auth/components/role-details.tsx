import { Suspense, useRef, useState } from 'react'
import { useRoleForm } from '../hooks/useRoleForm'
import RoleEditFormPermissions from './role-edit-form-permissions'
import UsersDataTable from './users-datatable'
import type { RoleFormSchemaValues } from '../lib/schemas/roleFormSchema'
import type { IdentityPermissions } from '../models/identityPermissions'
import type { Role } from '../models/role'
import type { PermissionsFormRef } from './permissions-form'
import type { DataModuleFormProps } from '@/components'
import {
  Form,
  FormContainer,
  FormGroup,
  FormSubmitBtn,
  Input,
  Tab,
  Tabs,
} from '@/components'

type RoleDetailsProps = DataModuleFormProps<Role, RoleFormSchemaValues> & {
  role: Role
  rolePermissions: IdentityPermissions
}

const RoleDetails = ({ role, rolePermissions, ...props }: RoleDetailsProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useRoleForm({ ...props, initialValues: role })

  return (
    <Tabs defaultActiveKey="overview">
      <Tab eventKey="overview" title="Overview">
        <FormContainer footer={<FormSubmitBtn isDirty={isDirty} form={form} />}>
          <Form form={form}>
            <FormGroup name="name" label="Nombre" input={Input} />
          </Form>
        </FormContainer>
      </Tab>
      <Tab eventKey="permissions" title="Permisos">
        <Suspense fallback="...">
          <RoleEditFormPermissions
            roleId={role.id}
            rolePermissions={rolePermissions}
            onDirtyChange={setIsDirty}
          />
        </Suspense>
      </Tab>
      <Tab eventKey="participants" title="Participantes">
        <UsersDataTable initialQuery={{ role: role.normalizedName }} />
      </Tab>
    </Tabs>
  )
}

export default RoleDetails
