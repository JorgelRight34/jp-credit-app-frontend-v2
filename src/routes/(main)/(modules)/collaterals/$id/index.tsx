import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { CollateralPage } from '@/features/collaterals'
import { buildCollateralQueryKey } from '@/features/collaterals/lib/query-keys'
import { getCollateralFromServer } from '@/features/collaterals/server/collateralClient'
import { getCollateral } from '@/features/collaterals/services/collateralClient'

export const getCollateralFn = createIsomorphicFn()
  .server((id) => getCollateralFromServer(id))
  .client((id) => getCollateral(id))

export const Route = createFileRoute('/(main)/(modules)/collaterals/$id/')({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildCollateralQueryKey(+id),
      queryFn: () => getCollateralFn(id),
    }),
  head: ({ params }) => ({ meta: [{ title: `Garantía ${params.id}` }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const collateral = Route.useLoaderData()

  return <CollateralPage collateral={collateral} />
}
