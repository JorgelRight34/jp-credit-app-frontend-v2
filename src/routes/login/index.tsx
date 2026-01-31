import { createFileRoute } from '@tanstack/react-router'
import { loginWithIdp } from '@/features/auth/server/authServerService'
import { COOKIES } from '@/lib/constants/cookies'
import { LoginPanel } from '@/features/auth'
import { withErrorHandler } from '@/lib/utils/server-utils'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
  server: {
    handlers: {
      POST: async ({ request }) => {
        return await withErrorHandler(async () => {
          const body = await request.json()
          const response = await loginWithIdp(body)

          return new Response(JSON.stringify(response), {
            headers: {
              'Set-Cookie': `${COOKIES.ACCESS_TOKEN}=${response.token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`,
              'Content-Type': 'application/json',
            },
          })
        })
      },
    },
  },
})

function RouteComponent() {
  return <LoginPanel />
}
