import { createFileRoute } from '@tanstack/react-router'
import { setCookie } from '@tanstack/react-start/server'
import { loginWithIdp } from '@/features/auth/server/authServerService'
import { COOKIES } from '@/lib/constants/cookies'
import { LoginPanel } from '@/features/auth'
import { withErrorHandler } from '@/lib/utils/server-utils'
import { IS_DEV_MODE } from '@/lib/utils'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: 'Iniciar sesión' }] }),
  server: {
    handlers: {
      POST: async ({ request }) => {
        return await withErrorHandler(async () => {
          const body = await request.json()
          const response = await loginWithIdp(body)

          setCookie(COOKIES.ACCESS_TOKEN, response.token, {
            httpOnly: !IS_DEV_MODE,
            secure: !IS_DEV_MODE,
            sameSite: IS_DEV_MODE ? 'lax' : 'strict',
            path: '/',
            maxAge: 604800,
          })

          console.log('lets go!!!!')

          return Response.json(response)
        })
      },
    },
  },
})

function RouteComponent() {
  return <LoginPanel />
}
