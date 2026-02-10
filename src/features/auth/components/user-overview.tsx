import type { User } from '../models/user'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import type { DataModuleFormProps } from '@/components'
import { FormReadOnlyGroup, FormRow } from '@/components'
import { getDateLabelSinceDate } from '@/lib/utils'

export type UserFormProps = Omit<
  DataModuleFormProps<User, UserFormValues>,
  'shouldEdit'
> & {
  user: User
}

const UserOverview = ({ user }: UserFormProps) => {
  return (
    <section>
      <FormRow>
        <FormReadOnlyGroup
          label="Nombres"
          name="firstName"
          value={user.firstName}
        />
        <FormReadOnlyGroup
          label="Apellidos"
          name="lastName"
          value={user.lastName}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          label="Usuario"
          name="username"
          value={user.username}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup label="Email" name="email" value={user.email} />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="lastAccess"
          label="Ultimo acceso"
          value={getDateLabelSinceDate(user.lastLogin)}
        />
      </FormRow>
      <FormReadOnlyGroup
        label="Habilitado"
        name="isActive"
        value={user.isActive ? 'Activo' : 'Deshabilitado'}
      />
    </section>
  )
}

export default UserOverview
