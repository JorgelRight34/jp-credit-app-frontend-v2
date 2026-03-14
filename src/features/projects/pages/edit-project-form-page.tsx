import { EditFormPageLayout, PagePanel } from '@/components'
import { Project } from '../models/project'
import { projectsPermissionProvider } from '../lib/config/permissionProvider'
import { projectsBreadcrumb } from './projects-page'
import ProjectForm from '../components/project-form'

const EditProjectFormPage = ({ project }: { project: Project }) => {
  return (
    <EditFormPageLayout
      breadcrumbs={[projectsBreadcrumb]}
      permissionProvider={projectsPermissionProvider}
      title={`Proyecto No. ${project.id} | ${project.name}`}
    >
      <PagePanel>
        <ProjectForm project={project} />
      </PagePanel>
    </EditFormPageLayout>
  )
}

export default EditProjectFormPage
