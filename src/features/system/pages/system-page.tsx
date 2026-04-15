import {
  BreadcrumbSpec,
  ComputerIcon,
  PageLayout,
  PageLayoutBreadcrumb,
  PagePanel,
  WorkerIcon,
} from '@/components'
import BackgroundServicesDataTable from '../components/background-services-datatable'

export const systemModuleBreadcrumb: BreadcrumbSpec = {
  title: 'Sistema',
  icon: ComputerIcon,
}

export const backgroundServiceBreadcrumb: BreadcrumbSpec = {
  title: 'Trabajos',
  pathname: '/system',
  icon: WorkerIcon,
}

const SystemPage = () => (
  <PageLayout
    title="Sistemas"
    breadcrumb={
      <PageLayoutBreadcrumb
        breadcrumbs={[systemModuleBreadcrumb, backgroundServiceBreadcrumb]}
      />
    }
  >
    <PagePanel>
      <BackgroundServicesDataTable />
    </PagePanel>
  </PageLayout>
)

export default SystemPage
