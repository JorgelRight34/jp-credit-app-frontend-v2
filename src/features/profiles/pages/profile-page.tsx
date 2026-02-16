import { getProfileFullName } from '../lib/utils'
import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import {
  createProfileBreadcrumb,
  profilesBreadcrumb,
} from '../lib/config/breadcrumb'
import ProfileOverview from '../components/profile-overview'
import ProfileEditFilesForm from '../components/profile-edit-files-form'
import type { BreadcrumbsByRoute } from '@/components'
import type { Profile } from '../models/profile'
import {
  createPageLayoutEditOption,
  OverviewIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
  UploadIcon,
} from '@/components'

interface ProfilePageProps {
  profile: Profile
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: { title: 'Overview', icon: OverviewIcon },
  files: { title: 'Archivos', icon: UploadIcon },
}

const ProfilePage = ({ profile }: ProfilePageProps) => {
  const title = getProfileFullName(profile)

  return (
    <PageRouterLayout
      title={title}
      permissionProvider={profilesPermissionProvider}
      options={[
        createPageLayoutEditOption('/profiles/$id/edit', {
          id: profile.id.toString(),
        }),
      ]}
      routerConfig={{
        defaultActive: 'overview',
        breadcrumbsByRoute,
        baseBreadcrumbs: [profilesBreadcrumb, createProfileBreadcrumb(profile)],
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
