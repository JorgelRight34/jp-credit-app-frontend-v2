import TransactionsDataTable from "./TransactionsDataTable";
import { TransactionsQuery } from "../models/transactionsQuery";
import TransactionQuerySearch from "./TransactionQuerySearch";
import { Transaction } from "../models/transaction";
import { EntitySection, EntitySectionProps } from "@/components";

type TransactionSectionProps = EntitySectionProps<
  Transaction,
  TransactionsQuery
>;

const TransactionSection = ({ ...props }: TransactionSectionProps) => {
  return (
    <EntitySection
      Search={TransactionQuerySearch}
      DataTable={TransactionsDataTable}
      {...props}
    />
  );
};

export default TransactionSection;
