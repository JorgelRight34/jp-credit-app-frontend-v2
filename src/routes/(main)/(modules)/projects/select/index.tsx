import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/projects/select/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/(modules)/projects/select/"!</div>
}
