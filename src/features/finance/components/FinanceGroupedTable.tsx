import { Column, DataTable, EntityDataTableProps } from "@/components";
import { dateToIsoString, WithRequired } from "@/utils/utils";
import { FinancialBreakdown } from "../models/financialBreakdown";
import { FinanceQuery } from "../models/financeQuery";
import { Transaction, TransactionType } from "@/features/transactions";
import { getDateGroupingLabel } from "../lib/lib";
import FinanceResultGroupTable from "./FinanceResultGroupTable";

export interface FinancialBreakdownDataTableProps
  extends WithRequired<
    EntityDataTableProps<FinancialBreakdown, FinanceQuery>,
    "query"
  > {
  data?: FinancialBreakdown[];
}

export interface FinanceGroupedTableProps
  extends WithRequired<
    Omit<
      EntityDataTableProps<FinancialBreakdown, FinanceQuery>,
      "defaultQuery"
    >,
    "columns" | "query"
  > {
  data?: FinancialBreakdown[];
  type: TransactionType;
  groupColumns: Column<Transaction>[];
}

const FinanceGroupedTable = ({
  data = [],
  groupColumns,
  columns,
  query,
  type,
}: FinanceGroupedTableProps) => {
  return (
    <DataTable<FinancialBreakdown>
      data={data}
      totalItems={data.length}
      columns={[
        {
          header: "Fechas",
          accessorKey: "date",
          cell: ({ row }) =>
            `${getDateGroupingLabel(row.original.start, query.timeUnit)} - ${getDateGroupingLabel(row.original.end, query.timeUnit)}`,
        },
        ...columns,
      ]}
      onExpand={(row) => (
        <div className="!max-h-[300px] w-full overflow-y-auto border border-red-500 !bg-white p-2">
          <FinanceResultGroupTable
            columns={groupColumns}
            query={{
              startDate: dateToIsoString(row.original.start),
              endDate: dateToIsoString(row.original.end),
              type,
            }}
          />
        </div>
      )}
    />
  );
};

export default FinanceGroupedTable;
