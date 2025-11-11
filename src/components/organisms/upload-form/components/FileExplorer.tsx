import { ColumnDef } from "@tanstack/react-table";
import { ApiFile } from "../../../models/apiFile";
import { toFormattedDate } from "../../../utils/utils";
import { useState } from "react";
import LightBox from "../../ui/LightBox";
import DateLabel from "../../ui/DateLabel";
import { DataTable } from "@/components/DataTable";
import { toastService } from "@/services";
import FilenameDataTableColumn from "./FilenameDataTableColumn";
import { Column } from "@/components/DataTable/models/column";
import { DatatableFile } from "../models/datatableFile";

interface FileExplorerProps {
  showLink?: boolean;
  extraColumns?: ColumnDef<DatatableFile>[];
  navigateCallBack?: (page: number) => void;
  files: DatatableFile[];
  showType?: boolean;
}

const columns: Column<DatatableFile>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    enableSorting: true,
    cell: ({ row }) => (
      <FilenameDataTableColumn
        name={row.original.name ?? "---"}
        fileType={row.original.fileType}
      />
    ),
  },
  {
    accessorKey: "fileType",
    header: "Tipo",
    enableSorting: true,
  },
  {
    accessorKey: "lastModified",
    header: "Modificado",
    enableSorting: true,
    cell: ({ row }) =>
      row.original.lastModified
        ? toFormattedDate(row.original.lastModified)
        : "---",
  },
  {
    accessorKey: "createdAt",
    header: "Creado",
    enableSorting: true,
    cell: ({ row }) =>
      row.original.createdAt ? (
        <DateLabel date={row.original.createdAt} />
      ) : (
        "---"
      ),
  },
];

const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "bmp",
  "svg",
  "tiff",
  "image/png",
];

const FileExplorer = ({ files = [], extraColumns = [] }: FileExplorerProps) => {
  const [lightBoxFiles, setLightBoxFiles] = useState<ApiFile[]>([]);
  const [showlightBox, setShowLightBox] = useState(false);

  const onRowClick = (file: ApiFile) => {
    if (imageExtensions.includes(file.fileType ?? "")) {
      setShowLightBox(true);
    } else if (file.url) {
      window.open(file.url, "_blank", "noopener,noreferer");
    } else {
      toastService.error(
        `Un archivo de tipo ${file.fileType} no se puede visualizar.`,
      );
    }
    setLightBoxFiles([file]);
  };

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
  );
};

export default FileExplorer;
