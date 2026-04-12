import { DeleteFormPageLayout } from '@/components'
import { PropsWithAdjustmentNote } from '../models/adjustmentNote'
import { buildAdjustmentNoteLabel } from '../lib/utils'
import { adjustmentNotesBreadcrumb } from './adjustment-notes-page'
import { buildAdjusmentNoteBreadcrumb } from './adjusment-note-page'
import DeleteAdjustmentNoteForm from '../components/delete-adjustment-note-form'

const DeleteAdjustmentNotePage = ({
  adjustmentNote,
}: PropsWithAdjustmentNote) => (
  <DeleteFormPageLayout
    title={buildAdjustmentNoteLabel(adjustmentNote)}
    breadcrumbs={[
      adjustmentNotesBreadcrumb,
      buildAdjusmentNoteBreadcrumb(adjustmentNote),
    ]}
    disabled={adjustmentNote.isClosed}
  >
    <DeleteAdjustmentNoteForm adjustmentNote={adjustmentNote} />
  </DeleteFormPageLayout>
)

export default DeleteAdjustmentNotePage
