import { CreateFormPageLayout, Tab, TabList } from '@/components'
import {
  closedPeriodBreadcrumb,
  transactionBreadcrumb,
} from '../lib/config/breadcrumb'
import { transactionPermissionProvider } from '../lib/config/permission-provider'
import CreateClosedPeriodForm from '../components/create-closed-period-form'
import { AccountingPeriod } from '../models/accountingPeriod'

const CreateClosedPeriodPage = ({
  currentPeriod,
}: {
  currentPeriod: AccountingPeriod
}) => {
  return (
    <CreateFormPageLayout
      title="Cerrar Periodo Contable"
      breadcrumbs={[transactionBreadcrumb, closedPeriodBreadcrumb]}
      permissionProvider={transactionPermissionProvider}
    >
      <TabList>
        <Tab title="Formulario" isActive />
      </TabList>
      <CreateClosedPeriodForm currentPeriod={currentPeriod} />
    </CreateFormPageLayout>
  )
}

export default CreateClosedPeriodPage
