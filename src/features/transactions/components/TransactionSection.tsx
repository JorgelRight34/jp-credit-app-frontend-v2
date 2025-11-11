import TransactionsDataTable from "./TransactionsDataTable";
import { TransactionsQuery } from "../models/transactionsQuery";
import TransactionQuerySearch from "./TransactionQuerySearch";
import { EntitySectionProps } from "@/components/EntitySection/models/EntitySectionProps";
import { Transaction } from "../models/transaction";
import EntitySection from "@/components/EntitySection/components/EntitySection";

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
