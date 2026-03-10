import {
  PageLayout,
  PageLayoutBreadcrumb,
  settingsBreadcrumb,
  TabList,
  Tab,
  buildPageLayoutConfirmationModalOption,
  ProtectedComponent,
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
        <TabList>
          <Tab title="Estado" isActive />
        </TabList>
        <LoanStatusForm loan={loan} />
      </ProtectedComponent>
    </PageLayout>
  )
}

export default LoanSettingsPage
