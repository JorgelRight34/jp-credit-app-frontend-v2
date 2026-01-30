import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(modules)/access-control/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(modules)/access-control/create/"!</div>
}
