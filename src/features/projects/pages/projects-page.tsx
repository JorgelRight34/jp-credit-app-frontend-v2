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
import { Project, PropsWithProjectId } from '../models/project'

export const projectsBreadcrumb: BreadcrumbSpec = {
  title: 'Proyectos',
  icon: FolderOpenIcon,
  pathname: '/projects',
}

interface ProjectsPageProps extends PropsWithProjectId {
  queryProjectId?: Project['id']
}

const ProjectsPage = ({ projectId, queryProjectId }: ProjectsPageProps) => {
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
        <ProjectDataTable
          currentProjectId={projectId}
          initialQuery={{ projectId: queryProjectId }}
        />
      </PagePanel>
    </PageLayout>
  )
}

export default ProjectsPage
