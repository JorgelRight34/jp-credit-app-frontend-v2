import clsx from 'clsx'
import { Tab, Tabs } from '../../tabs'
import FileFormExplorerTabPanel from './file-attachments-section'
import type { FileAccept } from '../../upload-form'
import type { UseFileAttachmentsReturn } from '../../upload-form/hooks/useFileAttachments'
import {
  DeleteIcon,
  FileInputWrapper,
  Icon,
  Paragraph,
  UploadIcon,
} from '@/components/atoms'
import { TableOptionCell } from '../../table'

type FileAttachmentsPanelProps = UseFileAttachmentsReturn & {
  showLimitWarning?: boolean
  className?: string
  accept?: FileAccept
  title?: string
  name?: string
}

const FileAttachmentsPanel = ({
  add,
  accept,
  name,
  remove,
  reachedLimit,
  className,
  showLimitWarning,
}: FileAttachmentsPanelProps) => {
  return (
    <div className={clsx('flex h-full flex-col', className)}>
      <Tabs defaultActiveKey="uploaded" variation="minimal">
        <Tab eventKey="uploaded" title="Subidos" icon={UploadIcon}>
          <FileFormExplorerTabPanel
            label="Subidos"
            existing={add.existingFiles}
            pending={add.pendingFiles}
            extraColumns={[
              {
                id: 'options',
                header: 'OPCIONES',
                cell: ({ row }) => (
                  <TableOptionCell
                    onClick={() =>
                      remove.removeFile(row.index, row.original.key)
                    }
                  >
                    Borrar
                  </TableOptionCell>
                ),
              },
            ]}
            buttons={
              <FileInputWrapper
                accept={accept}
                name={name}
                reachedLimit={reachedLimit}
                onChange={add.addFile}
              >
                <Icon icon={UploadIcon}>Subir</Icon>
              </FileInputWrapper>
            }
          />
        </Tab>
        <Tab eventKey="removed" title="Eliminados" icon={DeleteIcon}>
          <FileFormExplorerTabPanel
            label="Eliminados"
            extraColumns={[
              {
                id: 'options',
                header: 'OPCIONES',

                cell: ({ row }) => (
                  <TableOptionCell
                    onClick={() =>
                      remove.recoverFile(row.index, row.original.key)
                    }
                  >
                    Recuperar
                  </TableOptionCell>
                ),
              },
            ]}
            existing={remove.deletedExistingFiles}
            pending={remove.removedPendingFiles}
          />
        </Tab>
      </Tabs>
      {showLimitWarning && reachedLimit && (
        <Paragraph className="ml-3 text-red-500">
          Límite de archivos alcanzado
        </Paragraph>
      )}
    </div>
  )
}
export default FileAttachmentsPanel
