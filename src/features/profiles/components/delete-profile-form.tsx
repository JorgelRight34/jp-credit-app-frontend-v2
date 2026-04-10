import { ConfirmationForm } from '@/components'
import { PropsWithProfile } from '../models/profile'
import { deleteProfile } from '../services/profileClient'
import { profilesQueryKey } from '../lib/constants'

const DeleteProfileForm = ({ profile }: PropsWithProfile) => (
  <ConfirmationForm
    confirmationMessage={`Deseo eliminar al pérfil: ${profile.firstName} ${profile.lastName}`}
    onConfirm={() => deleteProfile(profile.id)}
    cacheKey={[profilesQueryKey]}
  />
)

export default DeleteProfileForm
