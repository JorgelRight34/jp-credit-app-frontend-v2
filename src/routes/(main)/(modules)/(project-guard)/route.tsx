import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/(project-guard)')({
  component: RouteComponent,
  staleTime: Infinity,
  shouldReload: false,
})

function RouteComponent() {
  return <Outlet />
}
