import {
  ConfirmationModal,
  ConfirmationModalRef,
  buildPageLayoutDeleteOption,
  PageLayout,
  PageLayoutBreadcrumb,
  settingsBreadcrumb,
  TabList,
  Tab,
} from '@/components'
import { Loan } from '../models/loan'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { buildLoanBreadcrumb, loanBreadcrumb } from '../lib/config/breadcrumb'
import LoanStatusForm from '../components/loan-status-form'
import { deleteLoan } from '../services/loanClient'
import { useRef } from 'react'
import { buildLoanLabel } from '../lib/utils'

interface LoanSettingsPageProps {
  loan: Loan
}

const LoanSettingsPage = ({ loan }: LoanSettingsPageProps) => {
  const modalRef = useRef<ConfirmationModalRef>(null)

  return (
    <PageLayout
      title={`${buildLoanLabel(loan)} / Ajustes`}
      permissionProvider={loanPermissionProvider}
      isAuthorizedFn={(p) => p.canEdit}
      options={[
        buildPageLayoutDeleteOption({
          onClick: () => modalRef.current?.show(),
          disabled: loan.hasPayments,
          tooltip: 'Un préstamo con transacciones no puede ser borrado.',
        }),
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
      <ConfirmationModal
        title="Borrar préstamo"
        ref={modalRef}
        confirmationMessage="Deseo borrar este préstamo"
        onConfirm={() => deleteLoan(loan.id)}
      />
    </PageLayout>
  )
}

export default LoanSettingsPage
