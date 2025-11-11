import { toCurrency } from "../../../utils/utils";
import useLoan from "../../Loans/hooks/useLoan";
import FinancialCard from "../../../components/ui/FinancialCard";
import useLoanPaymentDetails from "../hooks/useLoanPaymentDetails";
import { useCurrentProject } from "../../../contexts/ProjectContext";
import { LoadingSpinner } from "@/components/ui";
import clsx from "clsx";

interface TransactionFormDetailsProps {
  loanId?: number;
  amount?: number;
  className?: string;
  penaltyRate?: number;
}

const TransactionFormDetails = ({
  amount = 0,
  loanId,
  penaltyRate = 0,
  className = "",
}: TransactionFormDetailsProps) => {
  const { loan, isLoading } = useLoan({ id: loanId });
  const { project } = useCurrentProject();
  const { penaltyFee, interests, capital } = useLoanPaymentDetails({
    loan: loan,
    amount,
    penaltyRate,
    daysOfGrace: project?.graceDays,
  });

  if (isLoading) return <LoadingSpinner />;

  if (loan && amount > loan.disbursedAmount)
    return (
      <h6 className="text-danger">
        El monto ({amount}) no puede ser mayor al costo del préstamo (
        {loan.disbursedAmount})
      </h6>
    );

  return (
    <div className={clsx("flex flex-col space-y-3", className)}>
      <FinancialCard
        title={loanId ? `Prestamo #(${loanId})` : `Eliga un Préstamo`}
        orientation="row"
        subheading="Cuota"
        heading={loan ? toCurrency(loan.paymentValue) : "ND"}
        headers={[
          ["Atraso", loan ? toCurrency(loan.paymentValue) : "ND"],
          [
            "Interés Anual",
            loan ? `${(loan.annualInterestRate * 100).toFixed(2)}%` : "ND",
          ],
          ["Mora", loan ? toCurrency(loan.delinquency || 0) : "ND"],
        ]}
      />
      <FinancialCard
        title={
          loan
            ? `Prevista del Pago No.${
                loan.transactions ? loan.transactions?.length + 1 : ""
              }`
            : `Eliga un Préstamo`
        }
        subheading="Monto"
        orientation="row"
        heading={toCurrency(amount)}
        headers={[
          ["Capital", toCurrency(capital)],
          ["Intereses", toCurrency(interests)],
          ["Mora", toCurrency(penaltyFee || 0)],
        ]}
      />
    </div>
  );
};

export default TransactionFormDetails;
