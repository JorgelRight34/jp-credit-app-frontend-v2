import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)')({
  component: RouteComponent,
  pendingComponent: () => null,
  staleTime: Infinity,
  shouldReload: false,
})

function RouteComponent() {
  return <Outlet />
}
