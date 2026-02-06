import DocumentIcon from '../icons/document-icon'

interface FilenameTableCellProps {
  name: string
  fileType: string
  onClick?: () => void
}

const FilenameTableCell = ({
  fileType,
  name,
  onClick,
}: FilenameTableCellProps) => (
  <div className="flex items-center">
    <DocumentIcon type={fileType} />
    <span className="text-accent mr-3 ml-2 cursor-pointer" onClick={onClick}>
      {name} {fileType.replace('.', '')}
    </span>
  </div>
)

export default FilenameTableCell
