import {
  buildTransactionLabel,
  createTransactionQueryKey,
  DeleteTransactionPage,
  transactionPermissionProvider,
} from '@/features/transactions'
import { createFileRoute } from '@tanstack/react-router'
import { getTransactionFn } from '..'
import { requireModulePermissionToDelete } from '../../../route'
import { buildDeletePageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/$id/delete/',
)({
  beforeLoad: requireModulePermissionToDelete(transactionPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: createTransactionQueryKey(+id),
      queryFn: () => getTransactionFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: buildDeletePageTitle(buildTransactionLabel(loaderData!)),
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const transaction = Route.useLoaderData()

  return <DeleteTransactionPage transaction={transaction} />
}
