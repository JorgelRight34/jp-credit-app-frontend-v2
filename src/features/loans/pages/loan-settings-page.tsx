import {
  settingsBreadcrumb,
  buildPageLayoutConfirmationModalOption,
  ProtectedComponent,
  PageRouterLayout,
  BreadcrumbsByRoute,
  EditIcon,
  Tabs,
  Tab,
  TabsList,
  TabPanel,
} from '@/components'
import { Loan } from '../models/loan'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import LoanStatusForm from '../components/loan-status-form'
import { deleteLoan } from '../services/loanClient'
import { buildLoanLabel } from '../lib/utils'
import { loanModuleBreadcrumb } from './loans-page'
import { buildLoanBreadcrumb } from './loan-page'
import EditLoanForm from '../components/edit-loan-form'

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ icon: EditIcon, title: 'Editar' }],
  [settingsBreadcrumb],
]

const LoanSettingsPage = ({ loan }: { loan: Loan }) => {
  return (
    <PageRouterLayout
      title={`${buildLoanLabel(loan)} / Ajustes`}
      options={[
        buildPageLayoutConfirmationModalOption(
          {
            disabled: !!loan.lastTransactionDate,
            tooltip: 'Un préstamo con transacciones no puede ser borrado.',
          },
          {
            header: 'Borrar préstamo',
            confirmationMessage: 'Deseo borrar este préstamo',
            onConfirm: () => deleteLoan(loan.id),
          },
        ),
      ]}
      routerConfig={{
        baseBreadcrumbs: [loanModuleBreadcrumb, buildLoanBreadcrumb(loan)],
        breadcrumbsByRoute,
      }}
    >
      <ProtectedComponent
        provider={loanPermissionProvider}
        isAuthorizedFn={(p) => p.canEdit}
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
      </ProtectedComponent>
    </PageRouterLayout>
  )
}

export default LoanSettingsPage
