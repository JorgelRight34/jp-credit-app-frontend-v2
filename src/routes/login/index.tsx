import { createFileRoute } from '@tanstack/react-router'
import LoginPanel from '@/features/auth/components/login/login-panel'
import { loginWithIdp } from '@/features/auth/services/authServerService'
import { COOKIES } from '@/lib/constants/cookies'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()
        const response = await loginWithIdp(body)

        return new Response(JSON.stringify(response), {
          headers: {
            'Set-Cookie': `${COOKIES.ACCESS_TOKEN}=${response.token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`,
            'Content-Type': 'application/json',
          },
        })
      },
    },
  },
})

function RouteComponent() {
  return <LoginPanel />
}
