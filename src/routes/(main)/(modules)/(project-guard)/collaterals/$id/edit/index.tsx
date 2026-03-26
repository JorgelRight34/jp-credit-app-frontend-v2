import { createFileRoute } from '@tanstack/react-router'
import { getCollateralFn } from '..'
import { createCollateralKey } from '@/features/collaterals/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { EditCollateralFormPage } from '@/features/collaterals'
import { collateralsPermissionProvider } from '@/features/collaterals/lib/config/permissionsProvider'
import { getModulePermissionsBeforeLoad } from '@/routes/(main)/(modules)/route'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/collaterals/$id/edit/',
)({
  beforeLoad: getModulePermissionsBeforeLoad(collateralsPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: collateral } = useSuspenseData({
    key: createCollateralKey(+id),
    loader: () => getCollateralFn(+id),
  })

  return <EditCollateralFormPage collateral={collateral} />
}
