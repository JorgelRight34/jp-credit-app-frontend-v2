import { Ref, Suspense, useRef } from 'react'
import { updateRoleClaims } from '../services/authService'
import type { DataModuleFormProps, PropsWithFormRef } from '@/components'
import type { Role } from '../models/role'
import {
  Form,
  FormContainer,
  FormGroup,
  FormInput,
  FormWithRef,
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
import { RoleFormSchemaValues } from '../lib/schemas/roleFormSchema'
import { useRoleForm } from '../hooks/useRoleForm'

interface CreateRoleFormProps extends DataModuleFormProps<
  Role,
  RoleFormSchemaValues
> {}

const CreateRoleForm = (props: CreateRoleFormProps) => {
  const permissionFormRef = useRef<PermissionsFormRef>(null)
  const form = useRoleForm({
    defaultValues: { name: '' },
    onSuccess: (data) => {
      permissionFormRef.current?.setValue('id', data.id)
      permissionFormRef.current?.submit()
    },
    toastMessage: (data) => `Se ha creado el rol (${data?.id}) [${data!.name}]`,
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
          <PermissionsForm ref={permissionFormRef} />
        </Suspense>
      </TabPanel>
    </Tabs>
  )
}

const PermissionsForm = ({ ref }: PropsWithFormRef<PermissionsFormRef>) => {
  const form = usePermissionsForm({
    handler: updateRoleClaims,
  })

  return (
    <FormWithRef ref={ref} form={form}>
      <Suspense fallback="...">
        <FormInput name="claims" as={PermissionsFormTransferList} />
      </Suspense>
    </FormWithRef>
  )
}

export default CreateRoleForm
