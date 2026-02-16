import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/transactions/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/(modules)/transactions/$id/"!</div>
}
