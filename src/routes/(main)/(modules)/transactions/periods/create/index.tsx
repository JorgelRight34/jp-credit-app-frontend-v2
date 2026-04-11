import {
  CreateClosedPeriodPage,
  transactionPermissionProvider,
} from '@/features/transactions'
import { createCurrentAccountingPeriodQueryKey } from '@/features/transactions/lib/query-keys'
import { getCurrentAccountingPeriod } from '@/features/transactions/services/transactionClient'
import { useSuspenseData } from '@/hooks/useData'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { requireModulePermissionToCreate } from '../../../route'

const getCurrentAccountingPeriodFn = createIsomorphicFn()
  .server(() => getCurrentAccountingPeriod())
  .client(() => getCurrentAccountingPeriod())

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/periods/create/',
)({
  head: () => ({ meta: [{ title: buildPageTitle('Cerrar periodo') }] }),
  beforeLoad: requireModulePermissionToCreate(transactionPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const { data: currentPeriod } = useSuspenseData({
    key: createCurrentAccountingPeriodQueryKey(),
    loader: getCurrentAccountingPeriodFn,
  })

  return <CreateClosedPeriodPage currentPeriod={currentPeriod} />
}
