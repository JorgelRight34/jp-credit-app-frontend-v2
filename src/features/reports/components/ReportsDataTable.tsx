import { Column } from "@/components/DataTable/models/column";
import { Report } from "../models/report";
import { sortDateRows } from "@/utils/utils";
import { EntityDataTable } from "@/components/DataTable";
import { EntityDataTableProps } from "@/models";
import { ReportQuery } from "../models/reportQuery";
import { reportsCacheKey } from "../lib/constants";
import { getReports } from "../services/reportsClient";
import { AppLink, DateLabel, Icon } from "@/components/ui";
import FilenameDataTableColumn from "@/components/FileUpload/components/FilenameDataTableColumn";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useBookmarkReport } from "../hooks/useBookmarkReport";

type ReportsDataTableProps = EntityDataTableProps<Report, ReportQuery>;

const columns: Column<Report>[] = [
  {
    accessorKey: "id",
    header: "Id",
    enableSorting: true,
  },
  {
    accessorKey: "title",
    header: "Título",
    enableSorting: true,
  },
  {
    accessorKey: "document.name",
    header: "Archivo",
    enableSorting: true,
    cell: ({ row }) => (
      <FilenameDataTableColumn
        name={row.original.document.name ?? row.original.document.publicId}
        fileType={row.original.document.fileType}
      />
    ),
  },
  {
    accessorKey: "document.fileType",
    header: "Extensión",
    enableSorting: true,
  },
  {
    accessorKey: "document.lastModified",
    header: "Últ. Modificación",
    sortingFn: sortDateRows,
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.createdAt} />,
  },
  {
    header: "Opciones",
    cell: ({ row }) => (
      <AppLink className="text-accent" to={`/reports/${row.original.id}/edit`}>
        Editar
      </AppLink>
    ),
  },
];

const ReportsDataTable = ({ ...props }: ReportsDataTableProps) => {
  const params = useQueryParams();
  const { bookmark } = useBookmarkReport();

  return (
    <EntityDataTable<Report, ReportQuery>
      title="Reportes"
      columns={[
        ...columns,
        {
          header: "Generar",
          cell: ({ row }) => (
            <AppLink
              className="text-accent"
              to={`/reports/${row.original.id}`}
              params={params}
            >
              Generar Reporte
            </AppLink>
          ),
        },
        {
          header: "Marcar",
          cell: ({ row: { original } }) => (
            <Icon
              icon={original.bookmark ? "bookmark_added" : "bookmark_add"}
              onClick={() =>
                bookmark({
                  id: original.id,
                  bookmark: !original.bookmark,
                })
              }
            />
          ),
        },
      ]}
      cacheKey={reportsCacheKey}
      loader={getReports}
      onExpand={(row) => <p className="p-3">{row.original.description}</p>}
      {...props}
    />
  );
};

export default ReportsDataTable;
