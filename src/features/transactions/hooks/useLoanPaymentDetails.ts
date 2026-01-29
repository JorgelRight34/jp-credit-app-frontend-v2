import { Loan } from "@/features/loans";
import { TimeSpan } from "@/lib/utils";
import { useMemo } from "react";

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
    if (!loan) return 0;

    const now = new Date();
    now.setDate(now.getDate() + daysOfGrace);
    const dueDate = new Date(loan.effectivePaymentDate);

    const diffInMs = now.getTime() - dueDate.getTime();
    const lateDays = Math.floor(diffInMs / TimeSpan.fromDays(1));

    if (lateDays <= 0) return 0;

    return lateDays * penaltyRate;
  }, [daysOfGrace, loan, penaltyRate]);

  const interests = useMemo(() => {
    if (!loan || !amount || amount === 0) return 0;
    return (
      loan.principalBalance * (loan.annualInterestRate / loan.paymentFrequency)
    );
  }, [amount, loan]);

  const capital = useMemo(() =>
    loan ? amount - interests : 0
    , [loan, amount, interests]);

  return { penaltyFee, interests, capital };
};

export default useLoanPaymentDetails;
