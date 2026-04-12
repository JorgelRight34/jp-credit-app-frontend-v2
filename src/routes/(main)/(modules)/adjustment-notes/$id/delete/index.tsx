import { buildAdjustmentNoteQueryKey } from '@/features/adjustment-notes/lib/query-keys'
import { createFileRoute } from '@tanstack/react-router'
import { getAdjustmentNoteFn } from '..'
import { buildDeleteHead } from '@/lib/utils'
import { buildAdjustmentNoteLabel } from '@/features/adjustment-notes/lib/utils'
import { DeleteAdjustmentNotePage } from '@/features/adjustment-notes'

export const Route = createFileRoute(
  '/(main)/(modules)/adjustment-notes/$id/delete/',
)({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildAdjustmentNoteQueryKey(+id),
      queryFn: () => getAdjustmentNoteFn(id),
    }),
  head: ({ loaderData }) =>
    buildDeleteHead(loaderData, buildAdjustmentNoteLabel),
  component: RouteComponent,
})

function RouteComponent() {
  const note = Route.useLoaderData()

  return <DeleteAdjustmentNotePage adjustmentNote={note} />
}
