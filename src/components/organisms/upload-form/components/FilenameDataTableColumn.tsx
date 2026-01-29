import DocumentIcon from "../icons/DocumentIcon";

interface FilenameDataTableColumnProps {
  name: string;
  fileType: string;
}

const FilenameDataTableColumn = ({
  fileType,
  name,
}: FilenameDataTableColumnProps) => (
  <div className="flex items-center">
    <DocumentIcon type={fileType} />
    <span className="mr-3 ml-2">
      {name} {fileType.replace(".", "")}
    </span>
  </div>
);

export default FilenameDataTableColumn;
