import { CreateFormPageLayout, Tab, Tabs } from '@/components'
import { transactionPermissionProvider } from '../lib/config/permission-provider'
import { transactionBreadcrumb } from '../lib/config/breadcrumb'
import CreateTransactionForm from '../components/create-transaction-form'
import { Project } from '@/features/projects'

const CreateTransactionPage = ({ project }: { project: Project }) => {
  return (
    <CreateFormPageLayout
      title="Transacciones"
      breadcrumbs={[transactionBreadcrumb]}
      permissionProvider={transactionPermissionProvider}
    >
      <Tabs>
        <Tab eventKey="payments" title="Pagos">
          <CreateTransactionForm
            project={project}
            initialValues={{ type: 'pc' }}
          />
        </Tab>
        <Tab eventKey="disbursements" title="Desembolsos">
          <CreateTransactionForm
            project={project}
            initialValues={{ type: 'ds' }}
          />
        </Tab>
      </Tabs>
    </CreateFormPageLayout>
  )
}

export default CreateTransactionPage
