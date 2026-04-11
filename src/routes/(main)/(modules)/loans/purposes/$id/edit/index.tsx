import {
  EditLoanPurposePage,
  getLoanPurpose,
  loanPermissionProvider,
} from '@/features/loans'
import { buildLoanPurposeQueryKey } from '@/features/loans/lib/query-keys'
import { getLoanPurposeFromServer } from '@/features/loans/server/loanServerClient'
import { buildEditPageTitle } from '@/lib/utils'
import { requireModulePermissionToEdit } from '@/routes/(main)/(modules)/route'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getLoanPurposeFn = createIsomorphicFn()
  .server((id) => getLoanPurposeFromServer(id))
  .client((id) => getLoanPurpose(id))

export const Route = createFileRoute(
  '/(main)/(modules)/loans/purposes/$id/edit/',
)({
  beforeLoad: requireModulePermissionToEdit(loanPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildLoanPurposeQueryKey(+id),
      queryFn: () => getLoanPurposeFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildEditPageTitle(loaderData!.name) }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const purpose = Route.useLoaderData()

  return <EditLoanPurposePage purpose={purpose} />
}
