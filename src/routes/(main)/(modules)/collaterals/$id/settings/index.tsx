import { CollateralSettingsPage } from '@/features/collaterals'
import { buildCollateralQueryKey } from '@/features/collaterals/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getCollateralFn } from '..'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/$id/settings/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: collateral } = useSuspenseData({
    key: buildCollateralQueryKey(+id),
    loader: () => getCollateralFn(+id),
  })

  return <CollateralSettingsPage collateral={collateral} />
}
