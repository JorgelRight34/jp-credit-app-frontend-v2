import { useMemo } from "react";
import { Loan } from "../../Loans/models/loan";

interface UseLoanPaymentDetailsProps {
  loan?: Loan | null;
  amount: number;
  penaltyRate: number;
  daysOfGrace?: number;
}

const useLoanPaymentDetails = ({
  amount,
  loan,
  penaltyRate,
  daysOfGrace = 0,
}: UseLoanPaymentDetailsProps) => {
  const penaltyFee = useMemo(() => {
    // Total penalty fee between all payments
    if (!loan) return 0;

    const now = new Date();
    now.setDate(now.getDate() + daysOfGrace);
    const dueDate = new Date(loan.nextPaymentDate);

    const diffInMs = now.getTime() - dueDate.getTime();
    const lateDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert ms to full days

    if (lateDays <= 0) return 0;

    return lateDays * penaltyRate;
  }, [loan]);

  const interests = useMemo(() => {
    if (!loan || !amount || amount === 0) return 0;
    return (
      loan.principalBalance * (loan.annualInterestRate / loan.paymentFrequency)
    );
  }, [loan]);

  const capital = useMemo(() => {
    if (!loan) return 0;
    return amount - interests;
  }, [amount, loan, interests]);

  return { penaltyFee, interests, capital };
};

export default useLoanPaymentDetails;
