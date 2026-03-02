import {
  AllIcon,
  BreadcrumbsByRoute,
  buildPageLayoutCreateOption,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import { projectsBreadcrumb } from '../lib/config/breadcrumbs'
import ProjectDataTable from '../components/project-datatable'
import { Project } from '../models/project'

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
