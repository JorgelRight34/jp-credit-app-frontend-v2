import { Suspense, useRef } from 'react'
import { useRoleForm } from '../hooks/useRoleForm'
import { updateRoleClaims } from '../services/authService'
import type { DataModuleFormProps, PropsWithFormRef } from '@/components'
import type { PropsWithRole, Role } from '../models/role'
import type { RoleFormSchemaValues } from '../lib/schemas/roleFormSchema'
import {
  Form,
  FormContainer,
  FormGroup,
  FormInput,
  Input,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import {
  PermissionsFormRef,
  usePermissionsForm,
} from '../hooks/usePermissionsForm'
import PermissionsFormTransferList from './permissions-form-transfer-list'

interface EditRoleFormProps extends DataModuleFormProps<
  Role,
  RoleFormSchemaValues
> {
  role: Role
}

const EditRoleForm = ({ role, ...props }: EditRoleFormProps) => {
  const permissionFormRef = useRef<PermissionsFormRef>(null)
  const form = useRoleForm({
    roleId: role.id,
    defaultValues: { name: role.name },
    shouldEdit: true,
    toastMessage: () => `Se ha modificado el rol ${role?.name}`,
    ...props,
  })

  return (
    <Tabs>
      <TabsList>
        <Tab index={0}>Datos</Tab>
        <Tab index={1}>Permisos</Tab>
      </TabsList>
      <TabPanel index={0}>
        <FormContainer form={form}>
          <Form form={form}>
            <FormGroup name="name" label="Nombre" input={Input} />
          </Form>
        </FormContainer>
      </TabPanel>
      <TabPanel index={1}>
        <Suspense fallback="...">
          <PermissionsForm role={role} ref={permissionFormRef} />
        </Suspense>
      </TabPanel>
    </Tabs>
  )
}

const PermissionsForm = ({
  role,
}: PropsWithFormRef<PermissionsFormRef, PropsWithRole>) => {
  const form = usePermissionsForm({
    handler: updateRoleClaims,
    defaultValues: {
      id: role.id,
      claims: role.claims.map((c) => c.claimValue),
    },
    resetValues: false,
  })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <Suspense fallback="...">
          <FormInput name="claims" as={PermissionsFormTransferList} />
        </Suspense>
      </Form>
    </FormContainer>
  )
}

export default EditRoleForm
