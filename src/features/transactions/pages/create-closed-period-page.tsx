import {
  BreadcrumbSpec,
  CreateFormPageLayout,
  ScheduleIcon,
  Tab,
  TabList,
} from '@/components'
import { transactionPermissionProvider } from '../lib/config/permission-provider'
import CreateClosedPeriodForm from '../components/create-closed-period-form'
import { AccountingPeriod } from '../models/accountingPeriod'
import { transactionBreadcrumb } from './transactions-page'

export const closedPeriodsBreadcrumb: BreadcrumbSpec = {
  title: 'Periodos contables',
  icon: ScheduleIcon,
  pathname: '/transactions/periods',
}

const CreateClosedPeriodPage = ({
  currentPeriod,
}: {
  currentPeriod: AccountingPeriod
}) => {
  return (
    <CreateFormPageLayout
      title="Cerrar Periodo Contable"
      breadcrumbs={[transactionBreadcrumb, closedPeriodsBreadcrumb]}
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
