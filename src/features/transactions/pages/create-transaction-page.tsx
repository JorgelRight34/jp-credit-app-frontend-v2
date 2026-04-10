import {
  BreadcrumbsByRoute,
  createBreadcrumb,
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
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
      title="Crear transacción"
      routerConfig={{
        baseBreadcrumbs: [transactionBreadcrumb],
        breadcrumbsByRoute,
      }}
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
    </PageRouterLayout>
  )
}

export default CreateTransactionPage
