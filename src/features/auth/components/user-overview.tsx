import { Fieldset, FormReadOnlyGroup, Row, OverviewLayout } from '@/components'
import { getDateLabelSinceDate } from '@/lib/utils'
import { PropsWithUser } from '@/models/user'

const UserOverview = ({ user }: PropsWithUser) => {
  return (
    <OverviewLayout>
      <Fieldset legend="Nombres">
        <Row>
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
        </Row>
      </Fieldset>
      <Fieldset legend="Datos">
        <Row>
          <FormReadOnlyGroup
            label="Usuario"
            name="username"
            value={user.username}
          />
          <FormReadOnlyGroup label="Email" name="email" value={user.email} />
        </Row>
        <Row>
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
        </Row>
      </Fieldset>
    </OverviewLayout>
  )
}

export default UserOverview
