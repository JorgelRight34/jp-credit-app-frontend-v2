import LoansDataTable from "./LoansDataTable";
import { LoanQuery } from "../models/loanQuery";
import LoanQuerySearch from "./LoanQuerySearch";
import { Loan } from "../models/loan";
import EntitySection from "@/components/EntitySection/components/EntitySection";
import { EntitySectionProps } from "@/components/EntitySection/models/EntitySectionProps";

type LoanSectionProps = EntitySectionProps<Loan, LoanQuery>;

const LoansSection = ({ ...props }: LoanSectionProps) => {
  return (
    <EntitySection
      Search={LoanQuerySearch}
      DataTable={LoansDataTable}
      {...props}
    />
  );
};

export default LoansSection;
