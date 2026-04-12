import { createFileRoute } from '@tanstack/react-router'
import { getCollateralFn } from '..'
import { buildCollateralQueryKey } from '@/features/collaterals/lib/query-keys'
import { EditCollateralPage } from '@/features/collaterals'
import { collateralsPermissionProvider } from '@/features/collaterals/lib/config/permissionsProvider'
import { requireModulePermissionToEdit } from '@/routes/(main)/(modules)/route'
import { buildEditHead } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/collaterals/$id/edit/')(
  {
    beforeLoad: requireModulePermissionToEdit(collateralsPermissionProvider),
    loader: async ({ context, params: { id } }) =>
      await context.dataClient.ensureQueryData({
        queryKey: buildCollateralQueryKey(+id),
        queryFn: () => getCollateralFn(id),
      }),
    head: ({ loaderData }) => buildEditHead(loaderData, (l) => l.title),
    component: RouteComponent,
  },
)

function RouteComponent() {
  const collateral = Route.useLoaderData()

  return <EditCollateralPage collateral={collateral} />
}
