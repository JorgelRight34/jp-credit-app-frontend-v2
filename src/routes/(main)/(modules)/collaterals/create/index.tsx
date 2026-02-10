import { createFileRoute } from '@tanstack/react-router'
import { CollateralFormPage } from '@/features/collaterals'

export const Route = createFileRoute('/(main)/(modules)/collaterals/create/')({
  head: () => ({ meta: [{ title: 'Crear garantía' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <CollateralFormPage />
}
