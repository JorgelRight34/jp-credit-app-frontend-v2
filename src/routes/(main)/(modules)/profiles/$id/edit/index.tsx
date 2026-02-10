import { createFileRoute } from '@tanstack/react-router'
import { getProfileFn } from '..'
import { ProfileFormPage } from '@/features/profiles'
import { createProfileKey } from '@/features/profiles/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'

export const Route = createFileRoute('/(main)/(modules)/profiles/$id/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: profile } = useSuspenseData({
    key: createProfileKey(id),
    loader: () => getProfileFn(+id),
  })

  return <ProfileFormPage profile={profile} />
}
