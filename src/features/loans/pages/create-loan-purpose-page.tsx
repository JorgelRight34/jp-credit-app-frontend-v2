import { CreateFormPageLayout, PagePanel } from '@/components'
import LoanPurposeForm from '../components/loan-purpose-form'
import { loanPurposeBreadcrumb } from './loan-purposes-page'
import { loanModuleBreadcrumb } from './loans-page'
import { loanPermissionProvider } from '../lib/config/permission-provider'

const CreateLoanPurposePage = () => {
  return (
    <CreateFormPageLayout
      title="Crear destino"
      breadcrumbs={[loanModuleBreadcrumb, loanPurposeBreadcrumb]}
      permissionProvider={loanPermissionProvider}
    >
      <PagePanel>
        <LoanPurposeForm />
      </PagePanel>
    </CreateFormPageLayout>
  )
}

export default CreateLoanPurposePage
