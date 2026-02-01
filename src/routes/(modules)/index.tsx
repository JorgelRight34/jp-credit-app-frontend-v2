import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(modules)/')({
  head: () => ({ meta: [{ title: 'Index' }] }),
  component: App,
})

function App() {
  return null
}
