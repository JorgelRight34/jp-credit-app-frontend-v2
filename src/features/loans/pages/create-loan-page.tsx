import { CreateFormPageLayout } from '@/components'
import CreateLoanForm from '../components/create-loan-form'
import { Project } from '@/features/projects'
import { loanModuleBreadcrumb } from './loans-page'

const CreateLoanPage = ({ project }: { project: Project }) => (
  <CreateFormPageLayout
    title="Crear préstamo"
    breadcrumbs={[loanModuleBreadcrumb]}
  >
    <CreateLoanForm project={project} />
  </CreateFormPageLayout>
)

export default CreateLoanPage
