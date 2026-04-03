import { ResetPasswordPage } from '@/features/auth'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentUser } from '../route'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/reset-password/')({
  head: () => ({ title: buildPageTitle('Reiniciar contraseña'), meta: [] }),
  component: RouteComponent,
})

function RouteComponent() {
  const user = useSuspenseCurrentUser()

  return <ResetPasswordPage user={user} />
}
