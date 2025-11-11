import { FollowUp } from "../models/followUp";
import { EntityDataTableProps } from "../../../components/DataTable/models/entityDataTableProps";
import EntityDataTable from "../../../components/DataTable/components/EntityDataTable";
import { FollowUpQuery } from "../models/followUpQuery";
import { followUpsCacheKey } from "../lib/constants";
import { getFollowUps } from "../services/followUpClient";
import LinkToProfile from "@/features/Profiles/components/LinkToProfile";
import { Column } from "@/components/DataTable/models/column";
import LinkToLoan from "@/features/Loans/components/LinkToLoan";
import { sortDateRows } from "@/utils/utils";
import { DateLabel } from "@/components/ui";
import { useRouter } from "@/hooks/useRouter";

type FollowUpDataTableProps = EntityDataTableProps<FollowUp, FollowUpQuery>;

const columns: Column<FollowUp>[] = [
  { accessorKey: "id", header: "#", enableSorting: true },

  {
    accessorFn: (row) => row.clientFullName,
    header: "Cliente",
    cell: ({ row }) => <LinkToProfile profile={row.original.clientFullName} />,
  },
  {
    accessorFn: (row) => row.body[0],
    header: "Cuerpo",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="w-[200px]truncate block">{row.original.body}</span>
    ),
  },
  {
    accessorKey: "loanId",
    header: "Prestamo",
    enableSorting: true,
    cell: ({ row }) => <LinkToLoan id={row.original.loanId} />,
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    sortingFn: sortDateRows,
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.date} />,
  },
];

const FollowUpDataTable = ({ query, ...props }: FollowUpDataTableProps) => {
  const router = useRouter();

  return (
    <EntityDataTable
      cacheKey={followUpsCacheKey}
      query={query}
      title="Seguimiento"
      loader={getFollowUps}
      columns={columns}
      onRowClick={(f) => router.push(`/follow-ups/${f.id}`)}
      onExpand={(row) => (
        <div>
          <p>{row.original.body}</p>
        </div>
      )}
      {...props}
    />
  );
};

export default FollowUpDataTable;
