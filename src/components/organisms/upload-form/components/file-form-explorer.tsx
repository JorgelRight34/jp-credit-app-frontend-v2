import { useId, useMemo } from 'react'
import clsx from 'clsx'
import { mapApiFileToDatatableFile, mapFileToDatatableFile } from '../lib/utils'
import { Tab, Tabs } from '../../tabs'
import FileFormExplorerTabPanel from './file-form-explorer-tab-panel'
import type { UseFileAttachmentsReturn } from '../hooks/useFileAttachments'
import { DeleteIcon, DownloadIcon, Icon, UploadIcon } from '@/components/atoms'

type FileFormExplorerProps = UseFileAttachmentsReturn & {
  showLimitWarning?: boolean
  className?: string
  accept?: string
  title?: string
  name?: string
}

const FileFormExplorer = ({
  upload,
  accept,
  name,
  remove,
  reachedLimit,
  className,
  showLimitWarning,
}: FileFormExplorerProps) => {
  const id = useId()
  const uploaded = useMemo(
    () => [
      ...upload.loaded.map(mapApiFileToDatatableFile),
      ...upload.uploaded.map(mapFileToDatatableFile),
    ],
    [upload.loaded, upload.uploaded],
  )

  const removed = useMemo(
    () => [
      ...remove.deleted.map(mapApiFileToDatatableFile),
      ...remove.removedFiles.map(mapFileToDatatableFile),
    ],
    [remove.deleted, remove.removedFiles],
  )

  return (
    <div className={clsx('flex h-full flex-col', className)}>
      <Tabs defaultActiveKey="uploaded" variation="minimal">
        <Tab eventKey="uploaded" title="Subidos" icon={DownloadIcon}>
          <FileFormExplorerTabPanel
            label="Subidos"
            optionLabel="Borrar"
            files={uploaded}
            onOptionClick={remove.removeFile}
            buttons={
              <>
                <input
                  type="file"
                  className="hidden"
                  name={name ?? ''}
                  id={id}
                  accept={accept}
                  disabled={reachedLimit}
                  onChange={upload.addFile}
                />
                <label
                  htmlFor={id}
                  className={clsx('cursor-pointer', {
                    'pointer-events-none cursor-not-allowed opacity-50':
                      reachedLimit,
                  })}
                >
                  <Icon icon={UploadIcon}>Subir</Icon>
                </label>
              </>
            }
          />
        </Tab>
        <Tab eventKey="removed" title="Eliminados" icon={DeleteIcon}>
          <FileFormExplorerTabPanel
            label="Eliminados"
            optionLabel="Recuperar"
            files={removed}
            onOptionClick={remove.recoverFile}
          />
        </Tab>
      </Tabs>
      {showLimitWarning && reachedLimit && (
        <span className="ml-3 text-red-500">Límite de archivos alcanzado</span>
      )}
    </div>
  )
}

export default FileFormExplorer
