import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import * as TanstackQuery from './contexts/root-provider'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { NotFound } from './components'

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: {
      ...rqContext,
      user: null,
    },
    defaultNotFoundComponent: NotFound,
    defaultPreload: 'intent',
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.dataClient })

  return router
}
