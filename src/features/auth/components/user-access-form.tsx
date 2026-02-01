import { Suspense, useState } from 'react'
import PermissionsForm from './permissions-form'
import UserForm from './user-form'
import type { UserFormProps } from './user-form'
import {
  FormContainer,
  FormSubmitBtn,
  Tab,
  Tabs,
  useMultipleForms,
} from '@/components'

type UserAccessFormProps = UserFormProps

const UserAccessForm = ({ ...props }: UserAccessFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const { forms, setFormRef } = useMultipleForms(['user', 'permissions'])

  return (
    <FormContainer
      footer={
        <FormSubmitBtn
          isDirty={isDirty}
          onSubmit={() => forms['user']?.submit()}
        />
      }
    >
      <Tabs defaultActiveKey="data" navigate={false}>
        <Tab eventKey="data" title="Datos">
          <UserForm
            ref={setFormRef('user')}
            onSuccess={(data) => {
              forms['permissions']?.setValue('id', data.id)
              forms['permissions']?.submit()
            }}
            onDirtyChange={setIsDirty}
            {...props}
          />
        </Tab>
        <Tab eventKey="permissions" title="Permisos">
          <Suspense fallback="...">
            <PermissionsForm ref={setFormRef('permissions')} />
          </Suspense>
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default UserAccessForm
