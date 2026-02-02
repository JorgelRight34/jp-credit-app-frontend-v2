import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)')({
  component: RouteComponent,
  pendingComponent: () => null,
  pendingMs: 300,
})

function RouteComponent() {
  return <Outlet />
}
