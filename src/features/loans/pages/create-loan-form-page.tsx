import { CreateFormPageLayout } from '@/components'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { loanBreadcrumb } from '../lib/config/breadcrumb'
import CreateLoanForm from '../components/create-loan-form'
import { Project } from '@/features/projects'

const CreateLoanFormPage = ({ project }: { project: Project }) => {
  return (
    <CreateFormPageLayout
      title="Préstamos"
      permissionProvider={loanPermissionProvider}
      breadcrumbs={[loanBreadcrumb]}
    >
      <CreateLoanForm project={project} />
    </CreateFormPageLayout>
  )
}

export default CreateLoanFormPage
