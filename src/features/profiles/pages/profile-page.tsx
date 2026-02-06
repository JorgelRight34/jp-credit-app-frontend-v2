import { getProfileFullName } from '../lib/utils'
import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import { profilesBreadcrumb } from '../lib/config/breadcrumb'
import ProfileOverview from '../components/profile-overview'
import ProfileEditFilesForm from '../components/profile-edit-files-form'
import type { RouteBreadcrumbMap } from '@/components'
import type { Profile } from '../models/profile'
import {
  DashboardIcon,
  DownloadIcon,
  PageRouterLayout,
  PersonIcon,
  Tab,
  TabsRouter,
} from '@/components'

interface ProfilePageProps {
  profile: Profile
}

const tabBreadcrumbMap: RouteBreadcrumbMap = {
  overview: { title: 'Resumen', pathname: '.', icon: DashboardIcon },
  files: { title: 'Archivos', pathname: '.', icon: DownloadIcon },
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
        baseBreadcrumbs: [
          profilesBreadcrumb,
          { title, pathname: '.', icon: PersonIcon },
        ],
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
