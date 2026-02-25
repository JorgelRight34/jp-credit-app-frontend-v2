import {
  PageLayout,
  PageLayoutBreadcrumb,
  settingsBreadcrumb,
  TabList,
  Tab,
  buildPageLayoutConfirmationModalOption,
} from '@/components'
import { Loan } from '../models/loan'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { buildLoanBreadcrumb, loanBreadcrumb } from '../lib/config/breadcrumb'
import LoanStatusForm from '../components/loan-status-form'
import { deleteLoan } from '../services/loanClient'
import { buildLoanLabel } from '../lib/utils'

interface LoanSettingsPageProps {
  loan: Loan
}

const LoanSettingsPage = ({ loan }: LoanSettingsPageProps) => {
  return (
    <PageLayout
      title={`${buildLoanLabel(loan)} / Ajustes`}
      permissionProvider={loanPermissionProvider}
      isAuthorizedFn={(p) => p.canEdit}
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
            loanBreadcrumb,
            buildLoanBreadcrumb(loan),
            settingsBreadcrumb,
          ]}
        />
      }
    >
      <TabList>
        <Tab title="Estado" isActive />
      </TabList>
      <LoanStatusForm loan={loan} />
    </PageLayout>
  )
}

export default LoanSettingsPage
