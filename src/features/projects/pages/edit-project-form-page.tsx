import {
  BreadcrumbSpec,
  EditFormPageLayout,
  PagePanel,
  ProjectIcon,
} from '@/components'
import { Project } from '../models/project'
import { projectsPermissionProvider } from '../lib/config/permissionProvider'
import ProjectForm from '../components/project-form'

export const projectsBreadcrumb: BreadcrumbSpec = {
  title: 'Proyectos',
  icon: ProjectIcon,
}

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
