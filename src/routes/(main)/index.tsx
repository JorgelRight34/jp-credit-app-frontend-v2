import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/')({
  head: () => ({ meta: [{ title: buildPageTitle('Index') }] }),
  component: App,
})

function App() {
  return null
}
