import { CreateFormPageLayout, PagePanel } from '@/components'
import LoanPurposeForm from '../components/loan-purpose-form'
import { loanPurposeBreadcrumb } from './loan-purposes-page'
import { loanModuleBreadcrumb } from './loans-page'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { LoanPurpose } from '../models/loanPurpose'

const EditLoanPurposePage = ({ purpose }: { purpose: LoanPurpose }) => {
  return (
    <CreateFormPageLayout
      title={`Editar destino No. ${purpose.id}`}
      breadcrumbs={[loanModuleBreadcrumb, loanPurposeBreadcrumb]}
      permissionProvider={loanPermissionProvider}
    >
      <PagePanel>
        <LoanPurposeForm defaultValues={{ name: purpose.name }} shouldEdit />
      </PagePanel>
    </CreateFormPageLayout>
  )
}

export default EditLoanPurposePage
