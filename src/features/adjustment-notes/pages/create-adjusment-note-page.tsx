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
import { adjustmentNotesBreadcrumb } from './adjustment-notes-page'
import CreateAdjustmentNoteForm from '../components/create-adjustment-note-form'

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
          <CreateAdjustmentNoteForm initialValues={{ type: 'nc' }} />
        </TabPanel>
        <TabPanel index={1}>
          <CreateAdjustmentNoteForm initialValues={{ type: 'nd' }} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default CreateAdjustmentNotePage
