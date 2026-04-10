import { buildCollateralQueryKey } from '@/features/collaterals/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getCollateralFn } from '..'
import { getModulePermissionsBeforeLoad } from '../../../route'
import {
  collateralsPermissionProvider,
  DeleteCollateralPage,
} from '@/features/collaterals'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/$id/delete/',
)({
  beforeLoad: getModulePermissionsBeforeLoad(collateralsPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: collateral } = useSuspenseData({
    key: buildCollateralQueryKey(+id),
    loader: () => getCollateralFn(+id),
  })

  return <DeleteCollateralPage collateral={collateral} />
}
