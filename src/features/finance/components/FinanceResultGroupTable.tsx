import {
  Column,
  DataTableBody,
  DataTableFooter,
  DataTableHead,
  DataTableNavigation,
  DataTableStateWrapper,
  useEntityDataTable,
} from "@/components";
import {
  Transaction,
  transactionClient,
  transactionsCacheKey,
  TransactionsQuery,
} from "@/features/transactions";

interface FinanceResultGroupTableProps {
  query: TransactionsQuery;
  columns: Column<Transaction>[];
}

const FinanceResultGroupTable = ({
  query,
  columns,
}: FinanceResultGroupTableProps) => {
  const { data, fetchPage } = useEntityDataTable({
    cacheKey: transactionsCacheKey,
    loader: transactionClient.getTransactions,
    query,
  });

  return (
    <div className="w-full">
      <DataTableStateWrapper
        columns={columns}
        data={data.items}
        onPageChange={fetchPage}
        {...data}
        render={({ table }) => (
          <div>
            <table className="table-sm table w-full table-auto border-collapse rounded-xl !bg-white">
              <DataTableHead className="sticky-top !bg-white" table={table} />
              <DataTableBody className="!bg-white" table={table} />
              <DataTableFooter table={table} />
            </table>
            <DataTableNavigation totalItems={data.totalItems} table={table} />
          </div>
        )}
      />
    </div>
  );
};

export default FinanceResultGroupTable;
