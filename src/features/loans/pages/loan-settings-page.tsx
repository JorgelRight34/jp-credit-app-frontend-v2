import {
  PageLayout,
  PageLayoutBreadcrumb,
  settingsBreadcrumb,
  TabsList,
  Tab,
  buildPageLayoutConfirmationModalOption,
  ProtectedComponent,
  Tabs,
  TabPanel,
} from '@/components'
import { Loan } from '../models/loan'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import LoanStatusForm from '../components/loan-status-form'
import { deleteLoan } from '../services/loanClient'
import { buildLoanLabel } from '../lib/utils'
import { loanModuleBreadcrumb } from './loans-page'
import { buildLoanBreadcrumb } from './loan-page'

const LoanSettingsPage = ({ loan }: { loan: Loan }) => {
  return (
    <PageLayout
      title={`${buildLoanLabel(loan)} / Ajustes`}
      options={[
        buildPageLayoutConfirmationModalOption(
          {
            disabled: loan.hasPayments,
            tooltip: 'Un préstamo con transacciones no puede ser borrado.',
          },
          {
            title: 'Borrar préstamo',
            confirmationMessage: 'Deseo borrar este préstamo',
            onConfirm: () => deleteLoan(loan.id),
          },
        ),
      ]}
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[
            loanModuleBreadcrumb,
            buildLoanBreadcrumb(loan),
            settingsBreadcrumb,
          ]}
        />
      }
    >
      <ProtectedComponent
        provider={loanPermissionProvider}
        isAuthorizedFn={(p) => p.canEdit}
      >
        <Tabs>
          <TabsList>
            <Tab index={0}>Estado</Tab>
          </TabsList>
          <TabPanel index={1}>
            <LoanStatusForm loan={loan} />
          </TabPanel>
        </Tabs>
      </ProtectedComponent>
    </PageLayout>
  )
}

export default LoanSettingsPage
