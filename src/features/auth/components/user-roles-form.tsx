import { useState } from 'react'
import { useUserRolesForm } from '../hooks/useUserRolesForm'
import { getRoleString } from '../lib/utils'
import type { DataModuleFormProps } from '@/components'
import type { UserRolesFormValues } from '../lib/schemas/userRolesFormSchema'
import type { User } from '../models/user'
import type { Role } from '../models/role'
import {
  Form,
  FormContainer,
  FormInput,
  FormSubmitBtn,
  TransferList,
} from '@/components'

type UserRolesFormProps = DataModuleFormProps<null, UserRolesFormValues> & {
  user: User
  userRoles: Array<Role>
}

const UserRolesForm = ({ user, userRoles, ...props }: UserRolesFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const { form, rolesListClaims } = useUserRolesForm({
    userId: user.id,
    username: user.username,
    userRoles,
    onDirtyChange: setIsDirty,
    ...props,
  })

  return (
    <FormContainer footer={<FormSubmitBtn isDirty={isDirty} form={form} />}>
      <Form form={form}>
        <FormInput
          name="roles"
          as={({ value, ...inputProps }) =>
            TransferList({
              items: rolesListClaims,
              value: value as Array<string>,
              leftTitle: 'Disponibles',
              rightTitle: 'Seleccionados',
              rightSubtitle: `Elija los roles seleccionándolos y luego seleccione el botón de flecha "Elegir".`,
              leftSubtitle: `Elimine roles seleccionándolos y luego seleccione el botón de flecha "Eliminar".`,
              ...inputProps,
            })
          }
        />
      </Form>
    </FormContainer>
  )
}

export default UserRolesForm
