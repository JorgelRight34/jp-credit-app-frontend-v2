import GeneralAccountStatementQuerySearch from "./GeneralAccountStatementQuerySearch";
import GeneralAccountStatementsDataTable from "./GeneralAccountStatementDataTable";
import { EntitySection, EntitySectionProps } from "@/components";
import { Loan, LoanStatus, LoanQuery } from "@/features/loans";

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
