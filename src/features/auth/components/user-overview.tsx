import {
  Fieldset,
  FormReadOnlyGroup,
  LayoutRow,
  OverviewLayout,
} from '@/components'
import { getDateLabelSinceDate } from '@/lib/utils'
import { PropsWithUser } from '@/models/user'

const UserOverview = ({ user }: PropsWithUser) => {
  return (
    <OverviewLayout>
      <Fieldset legend="Nombres">
        <LayoutRow>
          <FormReadOnlyGroup
            label="Primer nombre"
            name="firstName"
            value={user.firstName}
          />
          <FormReadOnlyGroup
            label="Apellidos"
            name="lastName"
            value={user.lastName}
          />
        </LayoutRow>
      </Fieldset>
      <Fieldset legend="Datos">
        <LayoutRow>
          <FormReadOnlyGroup
            label="Usuario"
            name="username"
            value={user.username}
          />
          <FormReadOnlyGroup label="Email" name="email" value={user.email} />
        </LayoutRow>
        <LayoutRow>
          <FormReadOnlyGroup
            label="Estado"
            name="isActive"
            value={user.isActive ? 'Activo' : 'Deshabilitado'}
          />
          <FormReadOnlyGroup
            name="lastAccess"
            label="Ultimo acceso"
            value={getDateLabelSinceDate(user.lastLogin)}
          />
        </LayoutRow>
      </Fieldset>
    </OverviewLayout>
  )
}

export default UserOverview
