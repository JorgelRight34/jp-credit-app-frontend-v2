import { getRoleString } from '../lib/utils'
import { rolesQueryKey } from '../lib/constants'
import { getRoles } from '../services/authService'
import { PaginatedTransferList, type InputProps } from '@/components'

const UserRolesTransferList = (props: InputProps) => (
  <PaginatedTransferList
    queryKey={[rolesQueryKey, 'form-list-options']}
    loader={(page) => getRoles({ page, limit: 25, orderBy: 'name' })}
    mapItem={(role) => ({
      id: role.normalizedName,
      label: getRoleString(role),
    })}
    rightSubtitle='Elija los roles seleccionándolos y luego seleccione el botón de flecha "Elegir".'
    leftSubtitle='Elimine roles seleccionándolos y luego seleccione el botón de flecha "Eliminar".'
    {...props}
  />
)

export default UserRolesTransferList
