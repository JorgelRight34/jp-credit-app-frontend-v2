import {
  BreadcrumbsByRoute,
  createBreadcrumb,
  CreditIcon,
  DebitIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import { adjustmentNotesPermissionProvider } from '../lib/config/permission-provider'
import { adjustmentNotesBreadcrumb } from '../lib/config/breadcrumbs'
import AdjustmentNoteForm from '../components/adjustment-note-form'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  nc: [{ title: 'Crédito', icon: CreditIcon }, createBreadcrumb],
  nd: [{ title: 'Débito', icon: DebitIcon }, createBreadcrumb],
}

const CreateAdjustmentNotePage = () => {
  return (
    <PageRouterLayout
      title="Crear nota de ajuste"
      routerConfig={{
        defaultActive: 'nc',
        baseBreadcrumbs: [adjustmentNotesBreadcrumb],
        breadcrumbsByRoute,
      }}
      permissionProvider={adjustmentNotesPermissionProvider}
    >
      <TabsRouter>
        <Tab eventKey="nc" title="Crédito">
          <AdjustmentNoteForm initialValues={{ type: 'nc' }} />
        </Tab>
        <Tab eventKey="nd" title="Débito">
          <AdjustmentNoteForm initialValues={{ type: 'nd' }} />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default CreateAdjustmentNotePage
