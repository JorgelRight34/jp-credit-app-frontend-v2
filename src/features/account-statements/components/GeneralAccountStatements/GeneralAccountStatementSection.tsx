import { EntitySectionProps } from "@/components/EntitySection";
import EntitySection from "@/components/EntitySection/components/EntitySection";
import { Loan } from "@/features/Loans/models/loan";
import { LoanQuery } from "@/features/Loans/models/loanQuery";
import GeneralAccountStatementQuerySearch from "./GeneralAccountStatementQuerySearch";
import GeneralAccountStatementsDataTable from "./GeneralAccountStatementDataTable";
import { LoanStatus } from "@/features/Loans/models/loanStatus";

type GeneralAccountStatementSectionProps = EntitySectionProps<Loan, LoanQuery>;

const GeneralAccountStatementSection = ({
  ...props
}: GeneralAccountStatementSectionProps) => {
  return (
    <EntitySection
      Search={GeneralAccountStatementQuerySearch}
      DataTable={GeneralAccountStatementsDataTable}
      status={LoanStatus.Active}
      {...props}
    />
  );
};

export default GeneralAccountStatementSection;
