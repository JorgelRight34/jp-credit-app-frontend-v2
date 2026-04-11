import { CreateFormPageLayout, PagePanel } from '@/components'
import FollowUpForm from '../components/follow-up-form'
import { followUpBreadcrumb } from './follow-up-page'

const CreateFollowUpPage = () => {
  return (
    <CreateFormPageLayout
      title="Crear seguimiento"
      breadcrumbs={[followUpBreadcrumb]}
    >
      <PagePanel>
        <FollowUpForm />
      </PagePanel>
    </CreateFormPageLayout>
  )
}

export default CreateFollowUpPage
