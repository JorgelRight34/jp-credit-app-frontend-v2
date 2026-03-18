import { createFileRoute } from '@tanstack/react-router'
import { getCollateralFn } from '..'
import { createCollateralKey } from '@/features/collaterals/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { EditCollateralFormPage } from '@/features/collaterals'

export const Route = createFileRoute('/(main)/(modules)/(project-guard)/collaterals/$id/edit/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: collateral } = useSuspenseData({
    key: createCollateralKey(+id),
    loader: () => getCollateralFn(+id),
  })

  return <EditCollateralFormPage collateral={collateral} />
}
