import {
  AllIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  FolderOpenIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import ProjectDataTable from '../components/project-datatable'
import { Project } from '../models/project'

export const projectsBreadcrumb: BreadcrumbSpec = {
  title: 'Proyectos',
  icon: FolderOpenIcon,
  pathname: '/projects',
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: [{ title: 'Todos', icon: AllIcon }],
}

const ProjectsPage = ({ projectId }: { projectId?: Project['id'] }) => {
  return (
    <PageRouterLayout
      title="Proyectos"
      options={[buildPageLayoutCreateOption('/projects/create')]}
      routerConfig={{
        baseBreadcrumbs: [projectsBreadcrumb],
        defaultActive: 'all',
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="all" title="Todos">
          <ProjectDataTable initialQuery={{ projectId }} />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProjectsPage
