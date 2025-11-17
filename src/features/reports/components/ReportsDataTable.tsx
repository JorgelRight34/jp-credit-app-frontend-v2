import {
  AppLink,
  Column,
  DateLabel,
  EntityDataTable,
  EntityDataTableProps,
  FilenameDataTableColumn,
  Icon,
} from "@/components";
import { ReportQuery } from "../models/reportQuery";
import { sortDateRows } from "@/utils/utils";
import { useSearchParams } from "@/hooks/useSearchParams";
import { useBookmarkReport } from "../hooks/useBookmarkReport";
import { reportsCacheKey } from "../lib/constants";
import { reportsClient } from "../services/reportsClient";
import { Report } from "../models/report";

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
        name={row.original.document.name ?? row.original.document.publicId!}
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
  const params = useSearchParams();
  const { bookmark } = useBookmarkReport();

  return (
    <EntityDataTable
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
      loader={reportsClient.getReports}
      onExpand={(row) => <p className="p-3">{row.original.description}</p>}
      {...props}
    />
  );
};

export default ReportsDataTable;
