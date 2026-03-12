import {
  AllIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  FolderOpenIcon,
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import ProjectDataTable from '../components/project-datatable'
import { Project } from '../models/project'

export const projectsBreadcrumb: BreadcrumbSpec = {
  title: 'Proyectos',
  icon: FolderOpenIcon,
  pathname: '/projects',
}

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Todos', icon: AllIcon }],
]

const ProjectsPage = ({ projectId }: { projectId?: Project['id'] }) => {
  return (
    <PageRouterLayout
      title="Proyectos"
      options={[buildPageLayoutCreateOption('/projects/create')]}
      routerConfig={{
        baseBreadcrumbs: [projectsBreadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Todos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ProjectDataTable initialQuery={{ projectId }} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProjectsPage
