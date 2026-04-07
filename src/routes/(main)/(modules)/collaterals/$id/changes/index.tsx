import { buildCollateralQueryKey } from '@/features/collaterals/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { getCollateralFn } from '..'
import { CollateralChangeHistoryPage } from '@/features/collaterals'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/$id/changes/',
)({
  head: () => ({ meta: [{ title: buildPageTitle('Historial de cambios') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: collateral } = useSuspenseData({
    key: buildCollateralQueryKey(+id),
    loader: () => getCollateralFn(+id),
  })

  return <CollateralChangeHistoryPage collateral={collateral} />
}
