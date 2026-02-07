import { useMemo } from 'react'
import { TableOptionCell } from '../../table'
import { mapApiFileToTableFile, mapFileToTableFile } from '../../upload-form'
import FileExplorer from './file-table'
import type { ReactNode } from 'react'
import type { FileUploads } from '../../upload-form/hooks/useFileAttachments'
import type { FileModel } from '@/models/fileModel'
import { MediumTitle } from '@/components/atoms'

interface FileAttachmentsSectionProps {
  label: string
  existing: Array<FileModel>
  pending: Array<File>
  buttons?: ReactNode
  optionLabel: string
  onOptionClick: (index: number, key: keyof FileUploads) => void
}

const FileAttachmentsSection = ({
  label,
  buttons,
  optionLabel,
  existing,
  pending,
  onOptionClick,
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
          optionLabel={optionLabel}
          onOptionClick={onOptionClick}
        />
      </section>
    </div>
  )
}

const FileAttachmentsTable = ({
  existing,
  pending,
  optionLabel,
  onOptionClick,
}: Pick<
  FileAttachmentsSectionProps,
  'existing' | 'pending' | 'optionLabel' | 'onOptionClick'
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

  return (
    <FileExplorer
      extraColumns={[
        {
          id: 'options',
          header: 'OPCIONES',

          cell: ({ row }) => (
            <TableOptionCell
              onClick={() => onOptionClick(row.index, row.original.key)}
            >
              {optionLabel}
            </TableOptionCell>
          ),
        },
      ]}
      files={files}
    />
  )
}

export default FileAttachmentsSection
