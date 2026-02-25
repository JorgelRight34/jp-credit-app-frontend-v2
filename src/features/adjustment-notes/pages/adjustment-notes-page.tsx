import {
  AllIcon,
  BreadcrumbsByRoute,
  buildPageLayoutCreateOption,
  CreditIcon,
  DebitIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import { adjustmentNotesPermissionProvider } from '../lib/config/permission-provider'
import { adjustmentNotesBreadcrumb } from '../lib/config/breadcrumbs'
import AdjustmentNoteDataTable from '../components/adjusment-note-datatable'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: [{ title: 'Todos', icon: AllIcon }],
  nc: [{ title: 'Crédito', icon: CreditIcon }],
  nd: [{ title: 'Débito', icon: DebitIcon }],
}

const AdjustmentNotesPage = () => {
  return (
    <PageRouterLayout
      title="Notas de ajuste"
      permissionProvider={adjustmentNotesPermissionProvider}
      options={[buildPageLayoutCreateOption('/adjustment-notes/create')]}
      routerConfig={{
        defaultActive: 'nc',
        baseBreadcrumbs: [adjustmentNotesBreadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="all" title="Todos">
          <AdjustmentNoteDataTable />
        </Tab>
        <Tab eventKey="nc" title="Crédito">
          <AdjustmentNoteDataTable initialQuery={{ type: 'nc' }} />
        </Tab>
        <Tab eventKey="nd" title="Débito">
          <AdjustmentNoteDataTable initialQuery={{ type: 'nd' }} />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default AdjustmentNotesPage
