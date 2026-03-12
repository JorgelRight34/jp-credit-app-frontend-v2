import {
  buildPageLayoutConfirmationModalOption,
  EditFormPageLayout,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import { FollowUp } from '../models/followUp'
import { followUpPermissionProvider } from '../lib/config/permission-provider'
import FollowUpForm from '../components/follow-up-form'
import { deleteFollowUp } from '../services/followUpClient'
import { buildFollowUpBreadcrumb, followUpBreadcrumb } from './follow-up-page'

const EditFollowUpPage = ({ followUp }: { followUp: FollowUp }) => {
  return (
    <EditFormPageLayout
      title={followUp.title}
      options={[
        buildPageLayoutConfirmationModalOption(
          {
            title: 'Eliminar',
          },
          {
            title: 'Eliminar seguimiento',
            description: 'Eliminar seguimiento',
            confirmationMessage: 'Seguro que desea eliminar este seguimiento?',
            onConfirm: () => deleteFollowUp(followUp.id),
          },
        ),
      ]}
      permissionProvider={followUpPermissionProvider}
      breadcrumbs={[followUpBreadcrumb, buildFollowUpBreadcrumb(followUp)]}
    >
      <Tabs>
        <TabsList>
          <Tab index={0}>Formulario</Tab>
        </TabsList>
        <TabPanel index={0}>
          <FollowUpForm followUp={followUp} />
        </TabPanel>
      </Tabs>
    </EditFormPageLayout>
  )
}

export default EditFollowUpPage
