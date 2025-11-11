import { EntityDataTable } from "@/components/DataTable";
import { Column } from "@/components/DataTable/models/column";
import LinkToLoan from "@/features/Loans/components/LinkToLoan";
import { EntityDataTableProps } from "@/models";
import { DateLabel } from "@/components/ui";
import { getProjections } from "../../services/financeClient";
import {
  financialBreakdownBaseColumns,
  projectionsCacheKey,
} from "../../lib/constants";
import { FinanceQuery } from "../../models/financeQuery";
import { Projection } from "../../models/projection";

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
      retainDataWhileLoading={false}
      query={query}
      infinitePagination={true}
      loadInitialSelection={false}
      {...props}
    />
  );
};

export default ProjectionsDataTable;
