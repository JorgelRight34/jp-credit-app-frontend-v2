import { CreateCollateralFormPage } from '@/features/collaterals'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/collaterals/create/')({
  head: () => ({ meta: [{ title: 'Crear garantía' }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateCollateralFormPage />
}
