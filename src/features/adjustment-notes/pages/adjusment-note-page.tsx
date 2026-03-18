import {
  AdjustmentNoteIcon,
  buildPageLayoutConfirmationModalOption,
  overviewBreadcrumb,
  PageLayout,
  PageLayoutBreadcrumb,
  PagePanel,
} from '@/components'
import { AdjustmentNote } from '../models/adjustmentNote'
import { buildAdjustmentNoteLabel } from '../lib/utils'
import AdjustmentNoteOverview from '../components/adjustment-note-overview'
import { deleteAdjustmentNote } from '../services/adjustmentNoteClient'
import { adjustmentNotesBreadcrumb } from './adjustment-notes-page'

const AdjustmentNotePage = ({
  adjustmentNote,
}: {
  adjustmentNote: AdjustmentNote
}) => {
  const title = buildAdjustmentNoteLabel(adjustmentNote)

  return (
    <PageLayout
      title={title}
      options={[
        buildPageLayoutConfirmationModalOption(
          {
            title: 'Eliminar',
            disabled: adjustmentNote.isClosed,
            tooltip: 'No puede borrar una nota que ha sido cerrada.',
          },
          {
            onConfirm: () => deleteAdjustmentNote(adjustmentNote.id),
            title: 'Eliminar nota de ajuste',
            description:
              'Esta acción eliminará permanentemente la nota de ajuste seleccionada. Esta operación no se puede deshacer.',
            confirmationMessage:
              '¿Está seguro de que desea eliminar esta nota?',
          },
        ),
      ]}
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[
            adjustmentNotesBreadcrumb,
            {
              title,
              pathname: '/adjustment-notes/$id',
              params: { id: adjustmentNote.id.toString() },
              icon: AdjustmentNoteIcon,
            },
            overviewBreadcrumb,
          ]}
        />
      }
    >
      <PagePanel>
        <AdjustmentNoteOverview adjustmentNote={adjustmentNote} />
      </PagePanel>
    </PageLayout>
  )
}

export default AdjustmentNotePage
