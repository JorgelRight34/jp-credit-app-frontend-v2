import { EntitySectionProps } from "@/components/EntitySection";
import EntitySection from "@/components/EntitySection/components/EntitySection";
import { Loan } from "@/features/Loans/models/loan";
import { LoanQuery } from "@/features/Loans/models/loanQuery";
import GuarantorAccountStatementQuerySearch from "./GuarantorAccountStatementQuerySearch";
import GuarantorAccountStatementsDataTable from "./GuarantorAccountStatementsDataTable";

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
