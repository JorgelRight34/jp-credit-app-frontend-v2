import {
  BreadcrumbSpec,
  EditFormPageLayout,
  PagePanel,
  WorkerIcon,
} from '@/components'
import {
  BackgroundService,
  PropsWithBackgroundService,
} from '../models/backgroundService'
import {
  backgroundServiceBreadcrumb,
  systemModuleBreadcrumb,
} from './system-page'
import EditBackgroundServiceForm from '../components/edit-background-service-form'

export const buildBackgroundServiceBreadcrumb = (
  worker: BackgroundService,
): BreadcrumbSpec => ({ icon: WorkerIcon, title: worker.name })

const EditBackgroundServicePage = ({ worker }: PropsWithBackgroundService) => (
  <EditFormPageLayout
    title={worker.name}
    breadcrumbs={[
      systemModuleBreadcrumb,
      backgroundServiceBreadcrumb,
      buildBackgroundServiceBreadcrumb(worker),
    ]}
  >
    <PagePanel>
      <EditBackgroundServiceForm worker={worker} />
    </PagePanel>
  </EditFormPageLayout>
)

export default EditBackgroundServicePage
