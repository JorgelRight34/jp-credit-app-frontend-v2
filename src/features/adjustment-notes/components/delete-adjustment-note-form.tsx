import { ConfirmationForm } from '@/components'
import { PropsWithAdjustmentNote } from '../models/adjustmentNote'
import { deleteAdjustmentNote } from '../services/adjustmentNoteClient'

const DeleteAdjustmentNoteForm = ({
  adjustmentNote,
}: PropsWithAdjustmentNote) => (
  <ConfirmationForm
    confirmationMessage="Si el amor"
    onConfirm={() => deleteAdjustmentNote(adjustmentNote.id)}
  />
)

export default DeleteAdjustmentNoteForm
