import { useState } from 'react'
import { Table } from '../../table'
import FilenameDataTableColumn from './filename-table-cell'
import type { Column } from '../../table/models/column'
import type { FileModel } from '@/models/fileModel'
import type { TableFile } from '../models/tableFile'
import DateLabel from '@/components/atoms/date-label/date-label'
import { toastService } from '@/lib/services'
import { LightBox } from '@/components/molecules'
import { isImage, toFormattedDate } from '@/lib/utils'

interface FileExplorerProps {
  showLink?: boolean
  extraColumns?: Array<Column<TableFile>>
  files: Array<TableFile>
  showType?: boolean
  onPageChange?: (page: number) => void
}

const columns: Array<Column<TableFile>> = [
  {
    accessorKey: 'fileType',
    header: 'TIPO',
    enableSorting: true,
  },
  {
    accessorKey: 'lastModified',
    header: 'MODIFICADO',
    enableSorting: true,
    cell: ({ row }) =>
      row.original.lastModified
        ? toFormattedDate(row.original.lastModified)
        : '---',
  },
  {
    accessorKey: 'createdAt',
    header: 'CREADO',
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

  const onRowClick = (file: TableFile) => {
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
      <Table
        columns={[
          {
            accessorKey: 'name',
            header: 'NOMBRE',
            enableSorting: true,
            cell: ({ row }) => (
              <FilenameDataTableColumn
                onClick={() => onRowClick(row.original)}
                name={row.original.name ?? '---'}
                fileType={row.original.fileType}
              />
            ),
          },
          ...columns,
          ...extraColumns,
        ]}
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
