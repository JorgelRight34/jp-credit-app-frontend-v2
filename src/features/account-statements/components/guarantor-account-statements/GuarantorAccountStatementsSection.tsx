import { Loan, LoanQuery } from "@/features/loans";
import GuarantorAccountStatementQuerySearch from "./GuarantorAccountStatementQuerySearch";
import GuarantorAccountStatementsDataTable from "./GuarantorAccountStatementsDataTable";
import { EntitySection, EntitySectionProps } from "@/components";

type GuarantorAccountStatementsSectionProps = EntitySectionProps<
  Loan,
  LoanQuery
>;

const GuarantorAccountStatementsSection = ({
  ...props
}: GuarantorAccountStatementsSectionProps) => {
  return (
    <EntitySection
      Search={GuarantorAccountStatementQuerySearch}
      DataTable={GuarantorAccountStatementsDataTable}
      {...props}
    />
  );
};

export default GuarantorAccountStatementsSection;
