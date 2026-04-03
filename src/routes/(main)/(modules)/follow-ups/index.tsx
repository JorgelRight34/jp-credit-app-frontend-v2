import { FollowUpsPage } from '@/features/follow-ups'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/follow-ups/')({
  head: () => ({ meta: [{ title: buildPageTitle('Seguimientos') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <FollowUpsPage />
}
