import { AdjustmentNoteIcon, BreadcrumbSpec } from '@/components'
import { AdjustmentNote } from '../../models/adjustmentNote'
import { buildAdjustmentNoteLabel } from '../utils'

export const adjustmentNotesBreadcrumb: BreadcrumbSpec = {
  title: 'Notas de ajuste',
  pathname: '/adjustment-notes',
  icon: () => <AdjustmentNoteIcon />,
}

export const buildAdjustmentNoteBreadcrumb = (
  note: AdjustmentNote,
): BreadcrumbSpec => ({
  title: buildAdjustmentNoteLabel(note),
  pathname: '/adjustment-notes/$id',
  params: { id: note.id.toString() },
  icon: () => <AdjustmentNoteIcon />,
})
