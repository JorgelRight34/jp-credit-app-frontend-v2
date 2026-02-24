import {
  AllIcon,
  BreadcrumbsByRoute,
  buildPageLayoutCreateOption,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import { projectsBreadcrumb } from '../lib/config/breadcrumbs'
import { projectsPermissionProvider } from '../lib/config/permissionProvider'
import ProjectDataTable from '../components/project-datatable'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: [{ title: 'Todos', icon: AllIcon }],
}

const ProjectsPage = () => {
  return (
    <PageRouterLayout
      title="Proyectos"
      permissionProvider={projectsPermissionProvider}
      options={[buildPageLayoutCreateOption('/projects/create')]}
      routerConfig={{
        baseBreadcrumbs: [projectsBreadcrumb],
        defaultActive: 'all',
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="all" title="Todos">
          <ProjectDataTable />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProjectsPage
