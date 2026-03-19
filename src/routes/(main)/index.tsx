import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/')({
  head: () => ({ title: 'Index', meta: [] }),
  component: App,
})

function App() {
  return null
}
