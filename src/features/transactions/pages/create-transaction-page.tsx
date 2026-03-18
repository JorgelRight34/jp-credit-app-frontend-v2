import {
  BreadcrumbsByRoute,
  createBreadcrumb,
  PageRouterLayout,
  ProtectedComponent,
  Tab,
  TabPanel,
  TabsList,
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

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [paymentsBreadcrumb, createBreadcrumb],
  [disbursementsBreadcrumb, createBreadcrumb],
]

const CreateTransactionPage = ({
  project,
  loanId,
  amount,
}: CreateTransactionPageProps) => {
  return (
    <PageRouterLayout
      title="Transacciones"
      routerConfig={{
        baseBreadcrumbs: [transactionBreadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <ProtectedComponent
        provider={transactionPermissionProvider}
        isAuthorizedFn={(p) => p.canCreate}
      >
        <TabsRouter>
          <TabsList>
            <Tab index={0}>Pagos</Tab>
            <Tab index={1}>Desembolsos</Tab>
          </TabsList>
          <TabPanel index={0}>
            <CreatePaymentForm
              project={project}
              initialValues={{ loanId, amount }}
            />
          </TabPanel>
          <TabPanel index={1}>
            <CreateDisbursementForm
              project={project}
              initialValues={{ loanId, amount }}
            />
          </TabPanel>
        </TabsRouter>
      </ProtectedComponent>
    </PageRouterLayout>
  )
}

export default CreateTransactionPage
