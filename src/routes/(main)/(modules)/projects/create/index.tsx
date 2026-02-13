import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/projects/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/(modules)/projects/create/"!</div>
}
