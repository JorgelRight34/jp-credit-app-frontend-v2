import { Transaction, TransactionsQuery } from "@/features/transactions";
import AccountStatementsDataTable from "./ClientAccountStatementsDataTable";
import ClientAccountStatementQuerySearch from "./ClientStatementQuerySearch";
import { EntitySection, EntitySectionProps } from "@/components";

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
