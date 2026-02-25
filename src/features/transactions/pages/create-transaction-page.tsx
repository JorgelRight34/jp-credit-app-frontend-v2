import {
  BreadcrumbsByRoute,
  createBreadcrumb,
  DisbursementIcon,
  PageRouterLayout,
  PaymentIcon,
  Tab,
  TabsRouter,
} from '@/components'
import { transactionPermissionProvider } from '../lib/config/permission-provider'
import { transactionBreadcrumb } from '../lib/config/breadcrumb'
import CreatePaymentForm from '../components/create-payment-form'
import { Project } from '@/features/projects'
import CreateDisbursementForm from '../components/create-disbursement-form'

interface CreateTransactionPageProps {
  project: Project
  loanId?: number
  amount?: number
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  pay: [
    {
      icon: PaymentIcon,
      title: 'Pagos',
      pathname: '/transactions',
      search: { tab: 'payments' },
    },
    createBreadcrumb,
  ],
  disburse: [
    {
      icon: DisbursementIcon,
      title: 'Desembolsos',
      pathname: '/transactions',
      search: { tab: 'disbursements' },
    },
    createBreadcrumb,
  ],
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
      permissionProvider={transactionPermissionProvider}
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
    </PageRouterLayout>
  )
}

export default CreateTransactionPage
