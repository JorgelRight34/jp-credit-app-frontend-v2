import { CreateFormPageLayout } from '@/components'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import CreateLoanForm from '../components/create-loan-form'
import { Project } from '@/features/projects'
import { loanModuleBreadcrumb } from './loans-page'

const CreateLoanPage = ({ project }: { project: Project }) => {
  return (
    <CreateFormPageLayout
      title="Crear préstamo"
      permissionProvider={loanPermissionProvider}
      breadcrumbs={[loanModuleBreadcrumb]}
    >
      <CreateLoanForm project={project} />
    </CreateFormPageLayout>
  )
}

export default CreateLoanPage
