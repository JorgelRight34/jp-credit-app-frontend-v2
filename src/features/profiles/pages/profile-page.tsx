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
  TabPanel,
  TabsList,
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

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [overviewBreadcrumb],
  [{ title: 'Archivos', icon: UploadIcon }],
]

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
        breadcrumbsByRoute,
        baseBreadcrumbs: [profilesBreadcrumb, buildProfileBreadcrumb(profile)],
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Resumen</Tab>
          <Tab index={1}>Archivos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ProfileOverview profile={profile} />
        </TabPanel>
        <TabPanel index={1}>
          <section>
            <FileTable files={profile.files.map(mapApiFileToTableFile)} />
          </section>
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProfilePage
