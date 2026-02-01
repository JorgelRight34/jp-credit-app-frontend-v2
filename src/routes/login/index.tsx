import { createFileRoute } from '@tanstack/react-router'
import { setCookie } from '@tanstack/react-start/server'
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

          setCookie(COOKIES.ACCESS_TOKEN, response.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 604800,
          })

          return Response.json(response)
        })
      },
    },
  },
})

function RouteComponent() {
  return <LoginPanel />
}
