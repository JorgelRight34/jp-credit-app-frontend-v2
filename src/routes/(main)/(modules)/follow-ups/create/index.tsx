import { CreateFollowUpPage } from '@/features/follow-ups'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/follow-ups/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateFollowUpPage />
}
