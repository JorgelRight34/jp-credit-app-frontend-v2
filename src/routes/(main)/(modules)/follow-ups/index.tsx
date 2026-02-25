import { FollowUpsPage } from '@/features/follow-ups'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/follow-ups/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FollowUpsPage />
}
