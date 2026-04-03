import {
  BreadcrumbSpec,
  CreateFormPageLayout,
  ScheduleIcon,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
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
      title="Cerrar periodo contable"
      breadcrumbs={[transactionBreadcrumb, closedPeriodsBreadcrumb]}
      permissionProvider={transactionPermissionProvider}
    >
      <Tabs>
        <TabsList>
          <Tab index={0}>Formulario</Tab>
        </TabsList>
        <TabPanel index={0}>
          <CreateClosedPeriodForm currentPeriod={currentPeriod} />
        </TabPanel>
      </Tabs>
    </CreateFormPageLayout>
  )
}

export default CreateClosedPeriodPage
