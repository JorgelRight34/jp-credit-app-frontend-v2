import { useMemo } from 'react'
import { Column } from '../../table'
import { mapApiFileToTableFile, mapFileToTableFile } from '../../upload-form'
import FileTable from './file-table'
import type { ReactNode } from 'react'
import type { FileModel } from '@/models/fileModel'
import { MediumTitle } from '@/components/atoms'
import { TableFile } from '../models/tableFile'

interface FileAttachmentsSectionProps {
  label: string
  existing: Array<FileModel>
  pending: Array<File>
  buttons?: ReactNode
  extraColumns?: Array<Column<TableFile>>
}

const FileAttachmentsSection = ({
  label,
  buttons,
  existing,
  pending,
  extraColumns,
}: FileAttachmentsSectionProps) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      <section className="rounded-xl border p-4 shadow-sm">
        <header className="flex items-center justify-between mb-3">
          <MediumTitle className="font-semibold tracking-wide">
            {label}
          </MediumTitle>
          {buttons}
        </header>
        <FileAttachmentsTable
          existing={existing}
          pending={pending}
          extraColumns={extraColumns}
        />
      </section>
    </div>
  )
}

const FileAttachmentsTable = ({
  existing,
  pending,
  extraColumns,
}: Pick<
  FileAttachmentsSectionProps,
  'existing' | 'pending' | 'extraColumns'
>) => {
  const existingFiles = useMemo(
    () => existing.map(mapApiFileToTableFile),
    [existing],
  )
  const pendingFiles = useMemo(() => pending.map(mapFileToTableFile), [pending])

  const files = useMemo(
    () => existingFiles.concat(pendingFiles),
    [existingFiles, pendingFiles],
  )

  return <FileTable extraColumns={extraColumns} files={files} />
}

export default FileAttachmentsSection
