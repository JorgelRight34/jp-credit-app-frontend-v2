import { CollateralSettingsPage } from '@/features/collaterals'
import { buildCollateralQueryKey } from '@/features/collaterals/lib/query-keys'
import { createFileRoute } from '@tanstack/react-router'
import { getCollateralFn } from '..'
import { buildPageSettingsTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/$id/settings/',
)({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildCollateralQueryKey(+id),
      queryFn: () => getCollateralFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildPageSettingsTitle(loaderData!.title, 'Garantía') }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const collateral = Route.useLoaderData()

  return <CollateralSettingsPage collateral={collateral} />
}
