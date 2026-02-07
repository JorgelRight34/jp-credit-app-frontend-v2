import { Suspense, useRef, useState } from 'react'
import { updateUserClaims } from '../services/userClient'
import { updateUsernameOnForm } from '../lib/form-utils'
import { useUserForm } from '../hooks/useUserForm'
import PermissionsForm from './permissions-form'
import type { User } from '../models/user'
import type { PermissionsFormValues } from '../lib/schemas/permissionsFormSchema'
import type { DataModuleFormProps, FormRef } from '@/components'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import {
  Form,
  FormContainer,
  FormContainerButtons,
  FormGroup,
  FormRow,
  FormWatchGroup,
  Input,
  PasswordInput,
  Tab,
  Tabs,
} from '@/components'

type UserAccessFormProps = DataModuleFormProps<User, UserFormValues>

const UserAccessForm = (props: UserAccessFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const permissionFormRef = useRef<FormRef<PermissionsFormValues>>(null)

  const form = useUserForm({
    ...props,
    onSuccess: (data) => {
      permissionFormRef.current?.setValue('id', data.id)
      permissionFormRef.current?.submit()
    },
    onDirtyChange: setIsDirty,
  })

  return (
    <FormContainer
      footer={<FormContainerButtons isDirty={isDirty} form={form} />}
    >
      <Tabs defaultActiveKey="data" navigate={false}>
        <Tab eventKey="data" title="Datos">
          <Form form={form}>
            <FormRow>
              <FormGroup label="Nombres" name="firstName" input={Input} />
              <FormGroup label="Apellidos" name="lastName" input={Input} />
            </FormRow>
            <FormRow>
              <FormWatchGroup
                watchedValues={['firstName', 'lastName']}
                onWacthedValuesChange={updateUsernameOnForm}
                label="Usuario"
                name="username"
                input={Input}
              />
              <FormGroup
                label="Email"
                name="email"
                type="email"
                input={Input}
              />
            </FormRow>
            <FormRow>
              <FormGroup
                label="Contraseña"
                autoComplete="new-password"
                name="password"
                input={PasswordInput}
              />
              <FormGroup
                label="Confirmación"
                autoComplete="new-password"
                name="confirmation"
                input={PasswordInput}
              />
            </FormRow>
          </Form>
        </Tab>
        <Tab eventKey="permissions" title="Permisos">
          <Suspense fallback="...">
            <PermissionsForm
              handler={updateUserClaims}
              ref={permissionFormRef}
            />
          </Suspense>
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default UserAccessForm
