import { buildProfileFullName } from '../lib/utils'
import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import {
  buildProfileBreadcrumb,
  profilesBreadcrumb,
} from '../lib/config/breadcrumb'
import ProfileOverview from '../components/profile-overview'
import type { BreadcrumbsByRoute } from '@/components'
import type { Profile } from '../models/profile'
import {
  buildPageLayoutEditOption,
  FileTable,
  mapApiFileToTableFile,
  overviewBreadcrumb,
  PageRouterLayout,
  Tab,
  TabsRouter,
  UploadIcon,
} from '@/components'

interface ProfilePageProps {
  profile: Profile
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: [overviewBreadcrumb],
  files: [{ title: 'Archivos', icon: UploadIcon }],
}

const ProfilePage = ({ profile }: ProfilePageProps) => {
  const title = buildProfileFullName(profile)

  return (
    <PageRouterLayout
      title={title}
      permissionProvider={profilesPermissionProvider}
      options={[
        buildPageLayoutEditOption('/profiles/$id/edit', {
          id: profile.id.toString(),
        }),
      ]}
      routerConfig={{
        defaultActive: 'overview',
        breadcrumbsByRoute,
        baseBreadcrumbs: [profilesBreadcrumb, buildProfileBreadcrumb(profile)],
      }}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Resumen">
          <ProfileOverview profile={profile} />
        </Tab>
        <Tab eventKey="files" title="Archivos">
          <section>
            <FileTable files={profile.files.map(mapApiFileToTableFile)} />
          </section>
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
