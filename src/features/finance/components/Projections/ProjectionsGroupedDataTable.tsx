import { Column } from "@/components/DataTable/models/column";
import LinkToLoan from "@/features/Loans/components/LinkToLoan";
import { EntityDataTableProps } from "@/models";
import {
  dateGroupingColumn,
  financialBreakdownBaseColumns,
} from "../../lib/constants";
import { FinanceQuery } from "../../models/financeQuery";
import { Projection } from "../../models/projection";
import { WithRequired } from "@/utils/utils";
import { useGroupedProjections } from "../../hooks/useGroupedProjections";
import GroupedDataTable from "@/components/DataTable/components/GroupedDataTable";
import { PageSize } from "@/components/DataTable/models/pageSize";
import { loanPaymentFrequencySymbols } from "@/features/Loans/lib/constants";

type ProjectionsDataTableProps = WithRequired<
  EntityDataTableProps<Projection, FinanceQuery>,
  "query"
>;

const columns: Column<Projection>[] = [
  {
    accessorKey: "id",
    header: "Préstamo",
    enableSorting: true,
    footer: (info) => `${info.table.options.data.length} Préstamos`,
    cell: ({ row }) => <LinkToLoan id={row.original.loan?.id} />,
  },
  {
    accessorKey: "loan.paymentFrequency",
    header: "Frec. Pago",
    cell: ({ row }) =>
      loanPaymentFrequencySymbols[row.original.loan.paymentFrequency],
  },
  {
    accessorKey: "loan.client.profile.firstName",
    header: "Cliente",
  },
  ...(financialBreakdownBaseColumns as Column<Projection>[]),
];

const ProjectionsGroupedDataTable = ({ query }: ProjectionsDataTableProps) => {
  const { groups, periods, pageSize, onLimitChange, fetchPage } =
    useGroupedProjections({
      query,
      periodsOfMargin: 0,
    });

  return (
    <GroupedDataTable
      columns={[dateGroupingColumn(query) as Column<Projection>, ...columns]}
      navigateCallback={fetchPage}
      pageSize={pageSize as PageSize} // JUST FOR THE TEST
      totalItems={periods.length}
      onLimitChange={onLimitChange}
      groups={groups}
      groupPageSize={10}
    />
  );
};

export default ProjectionsGroupedDataTable;
