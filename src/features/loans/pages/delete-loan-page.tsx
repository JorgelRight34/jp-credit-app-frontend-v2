import { DeleteFormPageLayout } from '@/components'
import { PropsWithLoan } from '../models/loan'
import { buildLoanLabel } from '../lib/utils'
import { loanModuleBreadcrumb } from './loans-page'
import { buildLoanBreadcrumb } from './loan-page'
import DeleteLoanForm from '../components/delete-loan-form'

const DeleteLoanPage = ({ loan }: PropsWithLoan) => (
  <DeleteFormPageLayout
    breadcrumbs={[loanModuleBreadcrumb, buildLoanBreadcrumb(loan)]}
    title={buildLoanLabel(loan)}
  >
    <DeleteLoanForm loan={loan} />
  </DeleteFormPageLayout>
)

export default DeleteLoanPage
