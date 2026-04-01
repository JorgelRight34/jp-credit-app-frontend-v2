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
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import AdjustmentNoteDataTable from '../components/adjusment-note-datatable'

export const adjustmentNotesBreadcrumb: BreadcrumbSpec = {
  title: 'Notas de ajuste',
  pathname: '/adjustment-notes',
  icon: AdjustmentNoteIcon,
}

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Todos', icon: AllIcon }],
  [{ title: 'Crédito', icon: CreditIcon }],
  [{ title: 'Débito', icon: DebitIcon }],
]

const AdjustmentNotesPage = () => {
  return (
    <PageRouterLayout
      title="Notas de ajuste"
      options={[buildPageLayoutCreateOption('/adjustment-notes/create')]}
      routerConfig={{
        baseBreadcrumbs: [adjustmentNotesBreadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Todos</Tab>
          <Tab index={1}>Crédito</Tab>
          <Tab index={2}>Débito</Tab>
        </TabsList>
        <TabPanel index={0}>
          <AdjustmentNoteDataTable />
        </TabPanel>
        <TabPanel index={1}>
          <AdjustmentNoteDataTable initialQuery={{ type: 'nc' }} />
        </TabPanel>
        <TabPanel index={2}>
          <AdjustmentNoteDataTable initialQuery={{ type: 'nd' }} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default AdjustmentNotesPage
