import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { CssBaseline } from '@mui/material'
import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import type { User } from '@/features/auth'
import {
  Provider,
  TanStackQueryDevtools,
  getContext,
} from '@/contexts/root-provider'
import { LoadingBar, LoadingScreen } from '@/components'

interface MyRouterContext {
  dataClient: QueryClient
  user: User | null
}

const context = getContext()

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'JP Apoyo Empresarial',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased bg-stone-50">
        <Provider dataClient={context.dataClient}>
          <LoadingBar />
          <LoadingScreen />
          <CssBaseline />
          {children}
          <div id="modal-root"></div>
        </Provider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
