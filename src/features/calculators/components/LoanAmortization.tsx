import AmortizationDataTable from "./AmortizationDataTable";
import AmortizationLoanForm from "./AmortizationLoanForm";
import { AmortizationLoanQuery } from "../models/amortizationLoanQuery";
import { EntitySectionProps } from "@/components/EntitySection/models/EntitySectionProps";
import useLoan from "@/features/Loans/hooks/useLoan";
import EntitySection from "@/components/EntitySection/components/EntitySection";
import { AmortizationPayment } from "../models/amortizationPayment";

type LoanSectionProps = EntitySectionProps<
  AmortizationPayment,
  AmortizationLoanQuery
>;

const LoanAmortization = ({ loanId, ...props }: LoanSectionProps) => {
  const { loan } = useLoan({ id: loanId });

  return (
    <EntitySection
      Search={AmortizationLoanForm}
      DataTable={(table) =>
        AmortizationDataTable({
          ...table,
          startDate: loan?.startDate ? new Date(loan?.startDate) : undefined,
          paymentFrequencyPerYear: loan?.paymentFrequency,
        })
      }
      {...props}
    />
  );
};

export default LoanAmortization;
