import { currentUserQueryKey, ResetPasswordPage } from '@/features/auth'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getCurrentUserFn } from '../route'

export const Route = createFileRoute('/(main)/reset-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user } = useSuspenseData({
    key: currentUserQueryKey,
    loader: getCurrentUserFn,
  })

  return <ResetPasswordPage user={user} />
}
