import { buildCollateralQueryKey } from '@/features/collaterals/lib/query-keys'
import { createFileRoute } from '@tanstack/react-router'
import { getCollateralFn } from '..'
import { requireModulePermissionToDelete } from '../../../route'
import {
  collateralsPermissionProvider,
  DeleteCollateralPage,
} from '@/features/collaterals'
import { buildDeletePageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/$id/delete/',
)({
  beforeLoad: requireModulePermissionToDelete(collateralsPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildCollateralQueryKey(+id),
      queryFn: () => getCollateralFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildDeletePageTitle(loaderData!.title, 'Garantía') }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const collateral = Route.useLoaderData()

  return <DeleteCollateralPage collateral={collateral} />
}
