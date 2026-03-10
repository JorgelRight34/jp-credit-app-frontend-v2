import { EditFormPageLayout, PageLayoutContent } from '@/components'
import { Project } from '../models/project'
import ProjectForm from '../components/project-form'
import { projectsPermissionProvider } from '../lib/config/permissionProvider'
import { projectsBreadcrumb } from './projects-page'

const EditProjectFormPage = ({ project }: { project: Project }) => {
  return (
    <EditFormPageLayout
      breadcrumbs={[projectsBreadcrumb]}
      permissionProvider={projectsPermissionProvider}
      title={`Proyecto No. ${project.id} | ${project.name}`}
    >
      <PageLayoutContent>
        <ProjectForm project={project} />
      </PageLayoutContent>
    </EditFormPageLayout>
  )
}

export default EditProjectFormPage
