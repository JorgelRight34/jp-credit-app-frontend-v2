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
import {
  Provider,
  TanStackQueryDevtools,
  getContext,
} from '@/contexts/root-provider'
import { LoadingBar, LoadingScreen } from '@/components'
import { User } from '@/models/user'

export interface AppRouteContext {
  dataClient: QueryClient
  user: User | null
  projectId?: number
}

const context = getContext()

export const Route = createRootRouteWithContext<AppRouteContext>()({
  head: () => ({
    title: 'JP Apoyo Empresarial',
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/logo.svg',
        type: 'image/svg+xml',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html className="light" lang="es">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                var t = localStorage.getItem('theme');
                if (!t) {
                  var m = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  t = m ? 'dark' : 'light';
                }
                document.documentElement.classList.remove('light','dark');
                document.documentElement.classList.add(t);
              } catch (e) {}
            })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
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
