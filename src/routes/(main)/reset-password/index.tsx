import { ResetPasswordPage } from '@/features/auth'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentUser } from '../route'

export const Route = createFileRoute('/(main)/reset-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useSuspenseCurrentUser()

  return <ResetPasswordPage user={user} />
}
