import { useMemo } from 'react'
import clsx from 'clsx'
import {
  mapApiFileToDatatableFile,
  mapFileFormFieldValuesToDatatableFile,
  mapFileToDatatableFile,
} from '../lib/utils'
import { Tab, Tabs } from '../../tabs'
import FileFormExplorerTabPanel from './file-form-explorer-tab-panel'
import type { UseUploadFilesInputReturn } from '../models/useMultipleFilesInputProp'
import { DownloadIcon, UploadIcon } from '@/components/atoms'

type FileFormExplorerProps = UseUploadFilesInputReturn & {
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
  const { uploadedLoaded, uploadedCreated, uploadedUploaded } = useMemo(() => {
    return {
      uploadedLoaded: upload.loaded.map(mapApiFileToDatatableFile),
      uploadedCreated: upload.created.map(
        mapFileFormFieldValuesToDatatableFile,
      ),
      uploadedUploaded: upload.uploaded.map(mapFileToDatatableFile),
    }
  }, [upload.loaded, upload.created, upload.uploaded])

  const { removedDeleted, removedFiles, removedCreations } = useMemo(() => {
    return {
      removedDeleted: remove.deleted.map(mapApiFileToDatatableFile),
      removedFiles: remove.removedFiles.map(mapFileToDatatableFile),
      removedCreations: remove.removedCreations.map(
        mapFileFormFieldValuesToDatatableFile,
      ),
    }
  }, [remove.deleted, remove.removedFiles, remove.removedCreations])

  return (
    <div className={clsx('flex h-full flex-col', className)}>
      <Tabs defaultActiveKey="uploaded" variation="minimal" navigate={false}>
        <Tab
          title={
            <label>
              <input
                type="file"
                className="hidden"
                name={name ?? ''}
                accept={accept}
                disabled={reachedLimit}
                onChange={upload.handleOnFileChange}
              />
              Subir
            </label>
          }
          icon={UploadIcon}
          disabled={reachedLimit}
        >
          <label>
            <input
              type="file"
              className="hidden"
              name={name ?? ''}
              accept={accept}
              disabled={reachedLimit}
              onChange={upload.handleOnFileChange}
            />
            <button type="button">Subir</button>
          </label>
        </Tab>
        <Tab eventKey="uploaded" title="Ver Subidos" icon={DownloadIcon}>
          <FileFormExplorerTabPanel
            createdLabel="Subidos"
            deletedLabel="Removidos"
            created={uploadedUploaded}
            deleted={removedFiles}
            onRemove={remove.removeFile}
            onRecover={remove.recoverFile}
          />
        </Tab>
        <Tab eventKey="loaded" title="Ver Iniciales" icon={DownloadIcon}>
          <FileFormExplorerTabPanel
            createdLabel="Iniciales"
            deletedLabel="Removidos"
            created={uploadedLoaded}
            deleted={removedDeleted}
            onRemove={remove.removeFile}
            onRecover={remove.recoverFile}
          />
        </Tab>
        <Tab eventKey="created" title="Ver Creados" icon={DownloadIcon}>
          <FileFormExplorerTabPanel
            createdLabel="Creados"
            deletedLabel="Removidos"
            created={uploadedCreated}
            deleted={removedCreations}
            onRemove={remove.removeFile}
            onRecover={remove.recoverFile}
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
