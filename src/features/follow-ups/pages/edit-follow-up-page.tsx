import {
  buildPageLayoutConfirmationModalOption,
  EditFormPageLayout,
  Tab,
  TabList,
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
      <TabList>
        <Tab title="Formulario" isActive />
      </TabList>
      <FollowUpForm followUp={followUp} />
    </EditFormPageLayout>
  )
}

export default EditFollowUpPage
