import {
  settingsBreadcrumb,
  PageRouterLayout,
  BreadcrumbsByRoute,
  EditIcon,
  Tabs,
  Tab,
  TabsList,
  TabPanel,
  buildPageLayoutDeleteOption,
} from '@/components'
import { PropsWithLoan } from '../models/loan'
import LoanStatusForm from '../components/loan-status-form'
import { buildLoanLabel } from '../lib/utils'
import { loanModuleBreadcrumb } from './loans-page'
import { buildLoanBreadcrumb } from './loan-page'
import EditLoanForm from '../components/edit-loan-form'

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ icon: EditIcon, title: 'Editar' }],
  [settingsBreadcrumb],
]

const LoanSettingsPage = ({ loan }: PropsWithLoan) => {
  return (
    <PageRouterLayout
      title={`${buildLoanLabel(loan)} / Ajustes`}
      options={[
        buildPageLayoutDeleteOption({
          disabled: !!loan.lastTransactionDate,
          tooltip: 'Un préstamo con transacciones no puede ser borrado.',
          to: '/loans/$id/delete',
          params: { id: loan.id.toString() },
        }),
      ]}
      routerConfig={{
        baseBreadcrumbs: [loanModuleBreadcrumb, buildLoanBreadcrumb(loan)],
        breadcrumbsByRoute,
      }}
    >
      <Tabs>
        <TabsList>
          <Tab index={0}>Editar</Tab>
          <Tab index={1}>Estado</Tab>
        </TabsList>
        <TabPanel index={0}>
          <EditLoanForm loan={loan} />
        </TabPanel>
        <TabPanel index={1}>
          <LoanStatusForm loan={loan} />
        </TabPanel>
      </Tabs>
    </PageRouterLayout>
  )
}

export default LoanSettingsPage
