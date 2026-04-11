import { CreateFormPageLayout, PagePanel } from '@/components'
import ProjectForm from '../components/project-form'
import { projectsBreadcrumb } from './edit-project-form-page'

const CreateProjectFormPage = () => {
  return (
    <CreateFormPageLayout
      title="Crear proyecto"
      breadcrumbs={[projectsBreadcrumb]}
    >
      <PagePanel>
        <ProjectForm />
      </PagePanel>
    </CreateFormPageLayout>
  )
}

export default CreateProjectFormPage
