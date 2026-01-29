import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

export function getContext() {
  const dataClient = new QueryClient()

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
    <QueryClientProvider client={dataClient}>{children}</QueryClientProvider>
  )
}
