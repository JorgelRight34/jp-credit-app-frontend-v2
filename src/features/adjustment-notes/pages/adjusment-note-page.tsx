import {
  buildPageLayoutConfirmationModalOption,
  overviewBreadcrumb,
  PageLayout,
  PageLayoutBreadcrumb,
  Tab,
  TabList,
} from '@/components'
import { AdjustmentNote } from '../models/adjustmentNote'
import { buildAdjustmentNoteLabel } from '../lib/utils'
import {
  adjustmentNotesBreadcrumb,
  buildAdjustmentNoteBreadcrumb,
} from '../lib/config/breadcrumbs'
import AdjustmentNoteOverview from '../components/adjustment-note-overview'
import { deleteAdjustmentNote } from '../services/adjustmentNoteClient'

const AdjustmentNotePage = ({
  adjustmentNote,
}: {
  adjustmentNote: AdjustmentNote
}) => {
  return (
    <PageLayout
      title={buildAdjustmentNoteLabel(adjustmentNote)}
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
            buildAdjustmentNoteBreadcrumb(adjustmentNote),
            overviewBreadcrumb,
          ]}
        />
      }
    >
      <TabList>
        <Tab title="Resumen" isActive />
      </TabList>
      <AdjustmentNoteOverview adjustmentNote={adjustmentNote} />
    </PageLayout>
  )
}

export default AdjustmentNotePage
