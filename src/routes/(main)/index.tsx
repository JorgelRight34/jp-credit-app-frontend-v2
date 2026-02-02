import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/')({
  head: () => ({ meta: [{ title: 'Index' }] }),
  component: App,
})

function App() {
  return null
}
