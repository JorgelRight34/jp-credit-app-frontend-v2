import { ProfileChangeHistoryPage } from '@/features/profiles'
import { buildProfileKey } from '@/features/profiles/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getProfileFn } from '..'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/profiles/$id/changes/')(
  {
    head: () => ({ meta: [{ title: buildPageTitle('Historial de cambios') }] }),
    component: RouteComponent,
  },
)

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: profile } = useSuspenseData({
    key: buildProfileKey(id),
    loader: () => getProfileFn(+id),
  })

  return <ProfileChangeHistoryPage profile={profile} />
}
