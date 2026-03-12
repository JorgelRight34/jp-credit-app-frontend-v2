import {
  BreadcrumbsByRoute,
  createBreadcrumb,
  CreditIcon,
  DebitIcon,
  PageRouterLayout,
  ProtectedComponent,
  Tab,
  TabsRouter,
} from '@/components'
import { adjustmentNotesPermissionProvider } from '../lib/config/permission-provider'
import AdjustmentNoteForm from '../components/adjustment-note-form'
import { adjustmentNotesBreadcrumb } from './adjustment-notes-page'

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
    >
      <ProtectedComponent
        provider={adjustmentNotesPermissionProvider}
        isAuthorizedFn={(p) => p.canCreate}
      >
        <TabsRouter>
          <Tab eventKey="nc" title="Crédito">
            <AdjustmentNoteForm initialValues={{ type: 'nc' }} />
          </Tab>
          <Tab eventKey="nd" title="Débito">
            <AdjustmentNoteForm initialValues={{ type: 'nd' }} />
          </Tab>
        </TabsRouter>
      </ProtectedComponent>
    </PageRouterLayout>
  )
}

export default CreateAdjustmentNotePage
