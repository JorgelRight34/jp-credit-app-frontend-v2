import {
  BreadcrumbSpec,
  FlagIcon,
  PageLayout,
  PageLayoutBreadcrumb,
  PagePanel,
} from '@/components'
import { loanModuleBreadcrumb } from './loans-page'
import LoanPurposeDataTable from '../components/loan-purpose-datatable'

export const loanPurposeBreadcrumb: BreadcrumbSpec = {
  icon: () => <FlagIcon />,
  title: 'Destinos',
  pathname: '/loans/purposes',
}

const LoanPurposesPage = () => {
  return (
    <PageLayout
      title="Destinos"
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[loanModuleBreadcrumb, loanPurposeBreadcrumb]}
        />
      }
    >
      <PagePanel>
        <LoanPurposeDataTable />
      </PagePanel>
    </PageLayout>
  )
}

export default LoanPurposesPage
