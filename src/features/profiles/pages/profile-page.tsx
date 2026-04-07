import { buildProfileFullName } from '../lib/utils'
import ProfileOverview from '../components/profile-overview'
import type { BreadcrumbsByRoute, BreadcrumbSpec } from '@/components'
import type { Profile } from '../models/profile'
import {
  buildPageLayoutEditOption,
  buildPageLayoutMenuOption,
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
import { changeHistoryLinkLabel } from '@/features/audit'

export const buildProfileBreadcrumb = (profile: Profile): BreadcrumbSpec => ({
  title: (
    <>
      <span className="hidden md:block">{profile.firstName}</span>
      <span className="block md:hidden">
        {profile.firstName.split(' ')?.[0] ?? profile.firstName}
      </span>
    </>
  ),
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
  const id = profile.id.toString()

  return (
    <PageRouterLayout
      title={title}
      options={[
        buildPageLayoutMenuOption([
          {
            label: changeHistoryLinkLabel,
            to: '/profiles/$id/changes',
            params: { id },
          },
        ]),
        buildPageLayoutEditOption('/profiles/$id/edit', { id }),
      ]}
      routerConfig={{
        breadcrumbsByRoute,
        baseBreadcrumbs: [profilesBreadcrumb, buildProfileBreadcrumb(profile)],
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Resumen</Tab>
          <Tab index={1}>Documentos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ProfileOverview profile={profile} />
        </TabPanel>
        <TabPanel index={1}>
          <FileTable files={profile.files.map(mapApiFileToTableFile)} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProfilePage
