import {
  BreadcrumbsByRoute,
  createBreadcrumb,
  PageRouterLayout,
  ProtectedComponent,
  Tab,
  TabsRouter,
} from '@/components'
import { transactionPermissionProvider } from '../lib/config/permission-provider'
import CreatePaymentForm from '../components/create-payment-form'
import { Project } from '@/features/projects'
import CreateDisbursementForm from '../components/create-disbursement-form'
import {
  disbursementsBreadcrumb,
  paymentsBreadcrumb,
  transactionBreadcrumb,
} from './transactions-page'

interface CreateTransactionPageProps {
  project: Project
  loanId?: number
  amount?: number
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  pay: [paymentsBreadcrumb, createBreadcrumb],
  disburse: [disbursementsBreadcrumb, createBreadcrumb],
}

const CreateTransactionPage = ({
  project,
  loanId,
  amount,
}: CreateTransactionPageProps) => {
  return (
    <PageRouterLayout
      title="Transacciones"
      routerConfig={{
        defaultActive: 'pay',
        baseBreadcrumbs: [transactionBreadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <ProtectedComponent
        provider={transactionPermissionProvider}
        isAuthorizedFn={(p) => p.canCreate}
      >
        <TabsRouter>
          <Tab eventKey="pay" title="Pagos">
            <CreatePaymentForm
              project={project}
              initialValues={{ loanId, amount }}
            />
          </Tab>
          <Tab eventKey="disburse" title="Desembolsos">
            <CreateDisbursementForm initialValues={{ loanId, amount }} />
          </Tab>
        </TabsRouter>
      </ProtectedComponent>
    </PageRouterLayout>
  )
}

export default CreateTransactionPage
