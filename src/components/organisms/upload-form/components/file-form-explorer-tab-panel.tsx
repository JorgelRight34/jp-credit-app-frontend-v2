import DataTableOption from '../../datatable/components/data-table-option'
import FileExplorer from './file-explorer'
import type { FileUploads } from '../hooks/useUploadFilesInput'
import type { DatatableFile } from '../models/datatableFile'
import { MediumTitle } from '@/components/atoms'

interface FileFormExplorerTabContentProps {
  createdLabel: string
  deletedLabel: string
  created: Array<DatatableFile>
  deleted: Array<DatatableFile>
  onRemove: (index: number, key: keyof FileUploads) => void
  onRecover: (index: number, key: keyof FileUploads) => void
}

const FileFormExplorerTabPanel = ({
  createdLabel,
  deletedLabel,
  created,
  deleted,
  onRemove,
  onRecover,
}: FileFormExplorerTabContentProps) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      <section className="rounded-xl border bg-white/60 p-4 shadow-sm dark:bg-slate-900/40">
        <MediumTitle className="mb-3 text-lg font-semibold tracking-wide">
          {createdLabel}
        </MediumTitle>
        <FileExplorer
          extraColumns={[
            {
              header: 'Opciones',
              cell: ({ row }) => (
                <DataTableOption
                  onClick={() => onRemove(row.index, row.original.key)}
                >
                  Remover
                </DataTableOption>
              ),
            },
          ]}
          files={created}
        />
      </section>
      <div className="h-px bg-slate-300 dark:bg-slate-700" />
      <section className="rounded-xl border bg-white/60 p-4 shadow-sm dark:bg-slate-900/40">
        <MediumTitle className="mb-3 text-lg font-semibold tracking-wide">
          {deletedLabel}
        </MediumTitle>
        <FileExplorer
          extraColumns={[
            {
              header: 'Opciones',
              cell: ({ row }) => (
                <DataTableOption
                  onClick={() => onRecover(row.index, row.original.key)}
                >
                  Recuperar
                </DataTableOption>
              ),
            },
          ]}
          files={deleted}
        />
      </section>
    </div>
  )
}

export default FileFormExplorerTabPanel
