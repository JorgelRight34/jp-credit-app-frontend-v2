import { TableOptionCell } from '../../table'
import FileExplorer from './file-explorer'
import type { ReactNode } from 'react'
import type { FileUploads } from '../hooks/useFileAttachments'
import type { TableFile } from '../models/tableFile'
import { DateLabel, MediumTitle } from '@/components/atoms'

interface FileFormExplorerTabContentProps {
  label: string
  files: Array<TableFile>
  buttons?: ReactNode
  optionLabel: string
  onOptionClick: (index: number, key: keyof FileUploads) => void
}

const FileFormExplorerTabPanel = ({
  label,
  files,
  buttons,
  optionLabel,
  onOptionClick,
}: FileFormExplorerTabContentProps) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      <section className="rounded-xl border p-4 shadow-sm">
        <header className="flex items-center justify-between mb-3">
          <MediumTitle className="font-semibold tracking-wide">
            {label}
          </MediumTitle>
          {buttons}
        </header>
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
      </section>
    </div>
  )
}

export default FileFormExplorerTabPanel
