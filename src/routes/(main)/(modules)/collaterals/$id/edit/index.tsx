import { createFileRoute } from '@tanstack/react-router'
import { getCollateralFn } from '..'
import { buildCollateralQueryKey } from '@/features/collaterals/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { EditCollateralPage } from '@/features/collaterals'
import { collateralsPermissionProvider } from '@/features/collaterals/lib/config/permissionsProvider'
import { getModulePermissionsBeforeLoad } from '@/routes/(main)/(modules)/route'

export const Route = createFileRoute('/(main)/(modules)/collaterals/$id/edit/')(
  {
    beforeLoad: getModulePermissionsBeforeLoad(collateralsPermissionProvider),
    component: RouteComponent,
  },
)

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: collateral } = useSuspenseData({
    key: buildCollateralQueryKey(+id),
    loader: () => getCollateralFn(+id),
  })

  return <EditCollateralPage collateral={collateral} />
}
