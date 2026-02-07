import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/collaterals/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/(modules)/collaterals/$id/"!</div>
}
