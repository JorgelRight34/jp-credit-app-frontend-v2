import { buildCollateralQueryKey } from '@/features/collaterals/lib/query-keys'
import { buildHistoryHead } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { getCollateralFn } from '..'
import { CollateralChangeHistoryPage } from '@/features/collaterals'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/$id/changes/',
)({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildCollateralQueryKey(+id),
      queryFn: () => getCollateralFn(id),
    }),
  head: ({ loaderData }) => buildHistoryHead(loaderData, (l) => l.title),
  component: RouteComponent,
})

function RouteComponent() {
  const collateral = Route.useLoaderData()

  return <CollateralChangeHistoryPage collateral={collateral} />
}
