import { CreateFormPageLayout, PagePanel } from '@/components'
import LoanPurposeForm from '../components/loan-purpose-form'
import { loanPurposeBreadcrumb } from './loan-purposes-page'
import { loanModuleBreadcrumb } from './loans-page'

const CreateLoanPurposePage = () => {
  return (
    <CreateFormPageLayout
      title="Crear destino"
      breadcrumbs={[loanModuleBreadcrumb, loanPurposeBreadcrumb]}
    >
      <PagePanel>
        <LoanPurposeForm />
      </PagePanel>
    </CreateFormPageLayout>
  )
}

export default CreateLoanPurposePage
