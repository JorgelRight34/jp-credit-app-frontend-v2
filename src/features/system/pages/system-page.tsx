import {
  BreadcrumbSpec,
  ComputerIcon,
  PageLayout,
  PageLayoutBreadcrumb,
  PagePanel,
} from '@/components'
import BackgroundServicesDataTable from '../components/background-services-datatable'

export const systemModuleBreadcrumb: BreadcrumbSpec = {
  title: 'Sistema',
  icon: ComputerIcon,
}

export const backgroundServiceBreadcrumb: BreadcrumbSpec = {
  title: 'Trabajos',
  icon: ComputerIcon,
}

const SystemPage = () => (
  <PageLayout
    title="Sistemas"
    breadcrumb={<PageLayoutBreadcrumb breadcrumbs={[systemModuleBreadcrumb]} />}
  >
    <PagePanel>
      <BackgroundServicesDataTable />
    </PagePanel>
  </PageLayout>
)

export default SystemPage
