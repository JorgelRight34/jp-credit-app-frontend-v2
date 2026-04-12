import { ConfirmationForm } from '@/components'
import { PropsWithRole } from '../models/role'
import { deleteRole } from '../services/authService'

const DeleteRoleForm = ({ role }: PropsWithRole) => (
  <ConfirmationForm
    confirmationMessage="Borrar"
    onConfirm={() => deleteRole(role.id)}
  />
)
export default DeleteRoleForm
