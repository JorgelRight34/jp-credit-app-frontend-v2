import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/projects/')({
  component: RouteComponent,
  beforeLoad: () => {
    throw redirect({ to: '/projects/settings' })
  },
})

function RouteComponent() {
  return null
}
