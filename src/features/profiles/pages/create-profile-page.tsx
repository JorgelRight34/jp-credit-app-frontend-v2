import { CreateFormPageLayout } from '@/components'
import CreateProfileForm from '../components/create-profile-form'
import { profilesBreadcrumb } from './profiles-page'

const CreateProfilePage = () => (
  <CreateFormPageLayout title="Crear pérfil" breadcrumbs={[profilesBreadcrumb]}>
    <CreateProfileForm />
  </CreateFormPageLayout>
)

export default CreateProfilePage
