import {
  LockIcon,
  PageLayout,
  PageLayoutBreadcrumb,
  PagePanel,
} from '@/components'
import ResetPasswordForm from '../components/reset-password-form'
import { User } from '../../../models/user'

const ResetPasswordPage = ({ user }: { user: User }) => {
  return (
    <PageLayout
      title="Resetear contraseña"
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[{ icon: LockIcon, title: 'Resetear contraseña' }]}
        />
      }
    >
      <PagePanel>
        <ResetPasswordForm user={user} />
      </PagePanel>
    </PageLayout>
  )
}

export default ResetPasswordPage
