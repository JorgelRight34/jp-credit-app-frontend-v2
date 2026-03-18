import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { CollateralPage } from '@/features/collaterals'
import { createCollateralKey } from '@/features/collaterals/lib/query-keys'
import { getCollateralFromServer } from '@/features/collaterals/server/collateralClient'
import { getCollateral } from '@/features/collaterals/services/collateralClient'
import { useSuspenseData } from '@/hooks/useData'

export const getCollateralFn = createIsomorphicFn()
  .server((id: number) => getCollateralFromServer(id))
  .client((id: number) => getCollateral(id))

export const Route = createFileRoute('/(main)/(modules)/(project-guard)/collaterals/$id/')({
  head: ({ params }) => ({ meta: [{ title: `Garantía ${params.id}` }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: collateral } = useSuspenseData({
    key: createCollateralKey(+id),
    loader: () => getCollateralFn(+id),
  })

  return <CollateralPage collateral={collateral} />
}
