import { CreateFormPageLayout } from '@/components'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { loanBreadcrumb } from '../lib/config/breadcrumb'
import CreateLoanForm from '../components/create-loan-form'

const CreateLoanFormPage = () => {
  return (
    <CreateFormPageLayout
      title="Préstamos"
      permissionProvider={loanPermissionProvider}
      breadcrumbs={[loanBreadcrumb]}
    >
      <CreateLoanForm />
    </CreateFormPageLayout>
  )
}

export default CreateLoanFormPage
