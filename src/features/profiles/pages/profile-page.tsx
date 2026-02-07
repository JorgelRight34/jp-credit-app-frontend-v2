import { getProfileFullName } from '../lib/utils'
import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import { profilesBreadcrumb } from '../lib/config/breadcrumb'
import ProfileOverview from '../components/profile-overview'
import ProfileEditFilesForm from '../components/profile-edit-files-form'
import type { RouteBreadcrumbMap } from '@/components'
import type { Profile } from '../models/profile'
import {
  OverviewIcon,
  PageRouterLayout,
  PersonIcon,
  Tab,
  TabsRouter,
  UploadIcon,
} from '@/components'

interface ProfilePageProps {
  profile: Profile
}

const tabBreadcrumbMap: RouteBreadcrumbMap = {
  overview: { title: 'Overview', icon: OverviewIcon },
  files: { title: 'Archivos', icon: UploadIcon },
}

const ProfilePage = ({ profile }: ProfilePageProps) => {
  const title = getProfileFullName(profile)

  return (
    <PageRouterLayout
      title={title}
      permissionProvider={profilesPermissionProvider}
      routerConfig={{
        defaultActive: 'overview',
        tabBreadcrumbMap,
        baseBreadcrumbs: [profilesBreadcrumb, { title, icon: PersonIcon }],
      }}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Overview">
          <ProfileOverview profile={profile} />
        </Tab>
        <Tab eventKey="files" title="Archivos">
          <ProfileEditFilesForm profile={profile} />
        </Tab>
        <Tab eventKey="loans" title="Préstamos">
          ...
        </Tab>
        <Tab eventKey="transactions" title="Transacciones">
          ...
        </Tab>
        <Tab eventKey="collaterals" title="Garantías">
          ...
        </Tab>
        <Tab eventKey="follow-ups" title="Seguimientos">
          ...
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProfilePage
