import { createFileRoute } from '@tanstack/react-router'
import LoginPanel from '@/features/auth/components/login/login-panel'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginPanel />
}
