import { useState } from 'react'
import { DataTable } from '../../datatable'
import FilenameDataTableColumn from './FilenameDataTableColumn'
import type { DatatableFile } from '../models/datatableFile'
import type { Column } from '../../table/models/column'
import type { FileModel } from '@/models/fileModel'
import DateLabel from '@/components/atoms/date-label/date-label'
import { toastService } from '@/lib/services'
import { LightBox } from '@/components/molecules'
import { isImage, toFormattedDate } from '@/lib/utils'

interface FileExplorerProps {
  showLink?: boolean
  extraColumns?: Array<Column<DatatableFile>>
  files: Array<DatatableFile>
  showType?: boolean
  onPageChange?: (page: number) => void
}

const columns: Array<Column<DatatableFile>> = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    enableSorting: true,
    cell: ({ row }) => (
      <FilenameDataTableColumn
        name={row.original.name ?? '---'}
        fileType={row.original.fileType}
      />
    ),
  },
  {
    accessorKey: 'fileType',
    header: 'Tipo',
    enableSorting: true,
  },
  {
    accessorKey: 'lastModified',
    header: 'Modificado',
    enableSorting: true,
    cell: ({ row }) =>
      row.original.lastModified
        ? toFormattedDate(row.original.lastModified)
        : '---',
  },
  {
    accessorKey: 'createdAt',
    header: 'Creado',
    enableSorting: true,
    cell: ({ row }) =>
      row.original.createdAt ? (
        <DateLabel date={row.original.createdAt} />
      ) : (
        '---'
      ),
  },
]

const FileExplorer = ({ files = [], extraColumns = [] }: FileExplorerProps) => {
  const [lightBoxFiles, setLightBoxFiles] = useState<Array<FileModel>>([])
  const [showlightBox, setShowLightBox] = useState(false)

  const onRowClick = (file: DatatableFile) => {
    const type = file.fileType

    if (isImage(type)) {
      setLightBoxFiles([file])
      setShowLightBox(true)
      return
    }

    if (file.url) {
      window.open(file.url, '_blank', 'noopener,noreferrer')
      return
    }

    toastService.error(`Un archivo de tipo ${type} no se puede visualizar.`)
  }

  return (
    <>
      <DataTable
        className="documents-table"
        columns={[...columns, ...extraColumns]}
        data={files}
        onRowClick={onRowClick}
      />
      <LightBox
        files={lightBoxFiles}
        show={showlightBox}
        onHide={() => setShowLightBox(false)}
      />
    </>
  )
}

export default FileExplorer
