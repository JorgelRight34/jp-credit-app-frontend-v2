import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { AxiosError } from 'axios'
import errorHandler from '@/lib/services/errorHandler'
import { SnackbarContainer } from '@/components'

const onError = (error: unknown) => {
  if (error instanceof AxiosError) {
    errorHandler(error)
  }

  Promise.reject(error)
}

export function getContext() {
  const dataClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 120000, gcTime: 12000, retry: false },
    },
    queryCache: new QueryCache({
      onError,
    }),
    mutationCache: new MutationCache({ onError }),
  })

  return {
    dataClient,
  }
}

export const TanStackQueryDevtools = {
  name: 'Tanstack Query',
  render: <ReactQueryDevtoolsPanel />,
}

export function Provider({
  children,
  dataClient,
}: {
  children: React.ReactNode
  dataClient: QueryClient
}) {
  return (
    <QueryClientProvider client={dataClient}>
      {children}
      <SnackbarContainer />
    </QueryClientProvider>
  )
}
