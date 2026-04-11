import {
  BreadcrumbsByRoute,
  createBreadcrumb,
  CreditIcon,
  DebitIcon,
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import AdjustmentNoteForm from '../components/adjustment-note-form'
import { adjustmentNotesBreadcrumb } from './adjustment-notes-page'

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Crédito', icon: CreditIcon }, createBreadcrumb],
  [{ title: 'Débito', icon: DebitIcon }, createBreadcrumb],
]

const CreateAdjustmentNotePage = () => {
  return (
    <PageRouterLayout
      title="Crear nota de ajuste"
      routerConfig={{
        baseBreadcrumbs: [adjustmentNotesBreadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Crédito</Tab>
          <Tab index={1}>Débito</Tab>
        </TabsList>
        <TabPanel index={0}>
          <AdjustmentNoteForm initialValues={{ type: 'nc' }} />
        </TabPanel>
        <TabPanel index={1}>
          <AdjustmentNoteForm initialValues={{ type: 'nd' }} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default CreateAdjustmentNotePage
