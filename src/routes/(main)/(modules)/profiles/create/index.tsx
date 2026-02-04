import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/profiles/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/(modules)/profiles/create/"!</div>
}
