import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { ProfilePage } from '@/features/profiles'
import { getProfileFromServer } from '@/features/profiles/server/profileServerClient'
import { getProfile } from '@/features/profiles/services/profileClient'
import { useSuspenseData } from '@/hooks/useData'
import { createProfileKey } from '@/features/profiles/lib/query-keys'

const getProfileFn = createIsomorphicFn()
  .server((id: number) => getProfileFromServer(id))
  .client((id: number) => getProfile(id))

export const Route = createFileRoute('/(main)/(modules)/profiles/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const { data } = useSuspenseData({
    key: createProfileKey(+id),
    loader: () => getProfileFn(+id),
  })

  return <ProfilePage profile={data} />
}
