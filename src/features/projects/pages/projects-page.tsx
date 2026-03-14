import {
  AllIcon,
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  FolderOpenIcon,
  PageLayout,
  PageLayoutBreadcrumb,
  PagePanel,
} from '@/components'
import ProjectDataTable from '../components/project-datatable'
import { Project } from '../models/project'

export const projectsBreadcrumb: BreadcrumbSpec = {
  title: 'Proyectos',
  icon: FolderOpenIcon,
  pathname: '/projects',
}

const ProjectsPage = ({ projectId }: { projectId?: Project['id'] }) => {
  return (
    <PageLayout
      title="Proyectos"
      options={[buildPageLayoutCreateOption('/projects/create')]}
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[projectsBreadcrumb, { title: 'Todos', icon: AllIcon }]}
        />
      }
    >
      <PagePanel>
        <ProjectDataTable initialQuery={{ projectId }} />
      </PagePanel>
    </PageLayout>
  )
}

export default ProjectsPage
