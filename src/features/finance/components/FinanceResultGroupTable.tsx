import { DataTableNavigation } from "@/components/DataTable";
import DataTableBody from "@/components/DataTable/components/DataTableBody";
import DataTableFooter from "@/components/DataTable/components/DataTableFooter";
import DataTableHead from "@/components/DataTable/components/DataTableHead";
import DataTableStateWrapper from "@/components/DataTable/components/DataTableStateWrapper";
import useEntityDatatable from "@/components/DataTable/hooks/useEntityDatatable";
import { Column } from "@/components/DataTable/models/column";
import { transactionsCacheKey } from "@/features/Transactions/lib/constants";
import { Transaction } from "@/features/Transactions/models/transaction";
import { TransactionsQuery } from "@/features/Transactions/models/transactionsQuery";
import { getTransactions } from "@/features/Transactions/services/transactionsClient";

interface FinanceResultGroupTableProps {
  query: TransactionsQuery;
  columns: Column<Transaction>[];
}

const FinanceResultGroupTable = ({
  query,
  columns,
}: FinanceResultGroupTableProps) => {
  const { data, fetchPage } = useEntityDatatable({
    cacheKey: transactionsCacheKey,
    loader: getTransactions,
    retainDataWhileLoading: true,
    query,
  });

  return (
    <div className="w-full">
      <DataTableStateWrapper
        columns={columns}
        data={data.items}
        navigateCallback={fetchPage}
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
