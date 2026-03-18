import { AdjustmentNotePage } from '@/features/adjustment-notes'
import { buildAdjustmentNoteQueryKey } from '@/features/adjustment-notes/lib/query-keys'
import { getAdjustmentNoteFromServer } from '@/features/adjustment-notes/server/adjustmentNoteServerClient'
import { getAdjustmentNote } from '@/features/adjustment-notes/services/adjustmentNoteClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

const getAdjustmentNoteFn = createIsomorphicFn()
  .server((id) => getAdjustmentNoteFromServer(id))
  .client((id) => getAdjustmentNote(id))

export const Route = createFileRoute('/(main)/(modules)/(project-guard)/adjustment-notes/$id/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  const { id } = Route.useParams()
  const { data } = useSuspenseData({
    key: buildAdjustmentNoteQueryKey(+id),
    loader: () => getAdjustmentNoteFn(id),
  })

  return <AdjustmentNotePage adjustmentNote={data} />
}
