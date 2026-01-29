import { getProjections } from "../../services/financeClient";
import {
  financialBreakdownBaseColumns,
  projectionsCacheKey,
} from "../../lib/constants";
import { FinanceQuery } from "../../models/financeQuery";
import { Projection } from "../../models/projection";
import {
  Column,
  DateLabel,
  EntityDataTable,
  EntityDataTableProps,
} from "@/components";
import { LinkToLoan } from "@/features/loans";

type ProjectionsDataTableProps = EntityDataTableProps<Projection, FinanceQuery>;

const columns: Column<Projection>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.date} />,
    footer: "Totales",
  },
  {
    accessorKey: "id",
    header: "Préstamo",
    enableSorting: true,
    cell: ({ row }) => <LinkToLoan id={row.original.loan.id} />,
    footer: "",
  },
  ...(financialBreakdownBaseColumns as Column<Projection>[]),
];

const ProjectionsDataTable = ({
  query,
  ...props
}: ProjectionsDataTableProps) => {
  return (
    <EntityDataTable
      title="Proyección"
      columns={columns}
      loader={getProjections}
      cacheKey={projectionsCacheKey}
      displayEmptyMessage={true}
      query={query}
      infinitePagination={true}
      loadInitialSelection={false}
      {...props}
    />
  );
};

export default ProjectionsDataTable;
