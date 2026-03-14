import { ResetPasswordPage } from '@/features/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/reset-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()

  return <ResetPasswordPage user={user} />
}
