import {
  ConfirmationModal,
  ConfirmationModalRef,
  createPageLayoutDeleteOption,
  PageLayout,
  PageLayoutBreadcrumb,
  settingsBreadcrumb,
} from '@/components'
import { Loan } from '../models/loan'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { createLoanBreadcrumb, loanBreadcrumb } from '../lib/config/breadcrumb'
import LoanStatusForm from '../components/loan-status-form'
import { deleteLoan } from '../services/loanClient'
import { useRef } from 'react'
import { getLoanLabel } from '../lib/utils'

interface LoanSettingsPageProps {
  loan: Loan
}

const LoanSettingsPage = ({ loan }: LoanSettingsPageProps) => {
  const modalRef = useRef<ConfirmationModalRef>(null)

  return (
    <PageLayout
      title={`${getLoanLabel(loan)} / Ajustes`}
      permissionProvider={loanPermissionProvider}
      isAuthorizedFn={(p) => p.canEdit}
      options={[
        createPageLayoutDeleteOption({
          onClick: () => modalRef.current?.show(),
          disabled: loan.hasPayments,
          tooltip: 'Un préstamo con transacciones no puede ser borrado.',
        }),
      ]}
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[
            loanBreadcrumb,
            createLoanBreadcrumb(loan),
            settingsBreadcrumb,
          ]}
        />
      }
    >
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
