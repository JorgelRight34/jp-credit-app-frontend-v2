import { buildProfileFullName } from '../lib/utils'
import ProfileOverview from '../components/profile-overview'
import type { BreadcrumbsByRoute, BreadcrumbSpec } from '@/components'
import type { Profile } from '../models/profile'
import {
  buildPageLayoutEditOption,
  FileTable,
  mapApiFileToTableFile,
  overviewBreadcrumb,
  PageRouterLayout,
  PersonIcon,
  Tab,
  TabsRouter,
  UploadIcon,
} from '@/components'
import { profilesBreadcrumb } from './profiles-page'

export const buildProfileBreadcrumb = (profile: Profile): BreadcrumbSpec => ({
  title: profile.firstName,
  icon: PersonIcon,
  pathname: '/profiles/$id',
  params: { id: profile.id.toString() },
})

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: [overviewBreadcrumb],
  files: [{ title: 'Archivos', icon: UploadIcon }],
}

const ProfilePage = ({ profile }: { profile: Profile }) => {
  const title = buildProfileFullName(profile)

  return (
    <PageRouterLayout
      title={title}
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
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProfilePage
