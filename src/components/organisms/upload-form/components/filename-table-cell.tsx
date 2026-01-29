import DocumentIcon from '../icons/document-icon'

interface FilenameTableCellProps {
  name: string
  fileType: string
}

const FilenameTableCell = ({ fileType, name }: FilenameTableCellProps) => (
  <div className="flex items-center">
    <DocumentIcon type={fileType} />
    <span className="mr-3 ml-2">
      {name} {fileType.replace('.', '')}
    </span>
  </div>
)

export default FilenameTableCell
