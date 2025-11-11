import AccountStatementsDataTable from "./ClientAccountStatementsDataTable";
import { EntitySectionProps } from "@/components/EntitySection";
import EntitySection from "@/components/EntitySection/components/EntitySection";
import ClientAccountStatementQuerySearch from "./ClientStatementQuerySearch";
import { Transaction } from "@/features/Transactions/models/transaction";
import { TransactionsQuery } from "@/features/Transactions/models/transactionsQuery";

type ClientAccountStatementsSectionProps = EntitySectionProps<
  Transaction,
  TransactionsQuery
>;

const ClientAccountStatementsSection = ({
  ...props
}: ClientAccountStatementsSectionProps) => {
  return (
    <EntitySection
      Search={ClientAccountStatementQuerySearch}
      DataTable={AccountStatementsDataTable}
      {...props}
    />
  );
};

export default ClientAccountStatementsSection;
