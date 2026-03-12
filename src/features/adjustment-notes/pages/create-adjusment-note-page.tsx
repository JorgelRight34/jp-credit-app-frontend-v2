import {
  BreadcrumbsByRoute,
  createBreadcrumb,
  CreditIcon,
  DebitIcon,
  PageRouterLayout,
  ProtectedComponent,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import { adjustmentNotesPermissionProvider } from '../lib/config/permission-provider'
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
      <ProtectedComponent
        provider={adjustmentNotesPermissionProvider}
        isAuthorizedFn={(p) => p.canCreate}
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
      </ProtectedComponent>
    </PageRouterLayout>
  )
}

export default CreateAdjustmentNotePage
