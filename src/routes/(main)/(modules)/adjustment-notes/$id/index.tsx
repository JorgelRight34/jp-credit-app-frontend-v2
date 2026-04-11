import { AdjustmentNotePage } from '@/features/adjustment-notes'
import { buildAdjustmentNoteQueryKey } from '@/features/adjustment-notes/lib/query-keys'
import { buildAdjustmentNoteLabel } from '@/features/adjustment-notes/lib/utils'
import { getAdjustmentNoteFromServer } from '@/features/adjustment-notes/server/adjustmentNoteServerClient'
import { getAdjustmentNote } from '@/features/adjustment-notes/services/adjustmentNoteClient'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

const getAdjustmentNoteFn = createIsomorphicFn()
  .server((id) => getAdjustmentNoteFromServer(id))
  .client((id) => getAdjustmentNote(id))

export const Route = createFileRoute('/(main)/(modules)/adjustment-notes/$id/')(
  {
    loader: async ({ context, params: { id } }) =>
      await context.dataClient.ensureQueryData({
        queryKey: buildAdjustmentNoteQueryKey(+id),
        queryFn: () => getAdjustmentNoteFn(id),
      }),
    head: ({ loaderData }) => ({
      meta: [{ title: buildPageTitle(buildAdjustmentNoteLabel(loaderData!)) }],
    }),
    component: RouteComponent,
  },
)

function RouteComponent() {
  const note = Route.useLoaderData()

  return <AdjustmentNotePage adjustmentNote={note} />
}
