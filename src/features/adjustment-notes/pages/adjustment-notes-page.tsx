import {
  AdjustmentNoteIcon,
  AllIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  CreditIcon,
  DebitIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import AdjustmentNoteDataTable from '../components/adjusment-note-datatable'

export const adjustmentNotesBreadcrumb: BreadcrumbSpec = {
  title: 'Notas de ajuste',
  pathname: '/adjustment-notes',
  icon: AdjustmentNoteIcon,
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: [{ title: 'Todos', icon: AllIcon }],
  nc: [{ title: 'Crédito', icon: CreditIcon }],
  nd: [{ title: 'Débito', icon: DebitIcon }],
}

const AdjustmentNotesPage = () => {
  return (
    <PageRouterLayout
      title="Notas de ajuste"
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
