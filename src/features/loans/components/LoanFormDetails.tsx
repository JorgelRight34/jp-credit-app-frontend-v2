"use client";

import { FinancialCard } from "@/components";
import { getPmt, getTotalInterest, toCurrency } from "@/utils/utils";
import { useMemo } from "react";

interface LoanFormDefaultProps {
  amount?: number;
  annualInterestRate?: number;
  nPer?: number;
  paymentFrequency?: number;
  className?: string;
  orientation?: "row" | "col";
}

const LoanFormDetails = ({
  amount,
  orientation = "col",
  nPer,
  annualInterestRate,
  paymentFrequency,
  className = "",
}: LoanFormDefaultProps) => {
  const details = useMemo<{ pmt: number; totalInterest: number }>(() => {
    if (!nPer || nPer === 0 || !amount) return { pmt: 0, totalInterest: 0 };

    const calculatedPmt =
      getPmt(annualInterestRate ?? 0, paymentFrequency ?? 0, nPer, amount) || 0;

    const totalInterest =
      calculatedPmt && nPer && nPer > 0 && amount
        ? getTotalInterest(calculatedPmt, nPer, amount)
        : 0;

    return { pmt: calculatedPmt, totalInterest: totalInterest };
  }, [annualInterestRate, amount, nPer, paymentFrequency]);

  return (
    <FinancialCard
      orientation={orientation}
      className={className}
      headingClassName="py-4"
      icon="info"
      title="Prevista del Préstamo"
      subheading="Cuota"
      heading={toCurrency(details.pmt)}
      headers={[
        ["Monto", toCurrency(amount || 0)],
        [
          "Interés Anual",
          annualInterestRate ? `${annualInterestRate * 100}%` : `0%`,
        ],
        ["Interés Total Pagado", toCurrency(details.totalInterest || 0)],
        ["Capital Total Pagado", toCurrency(amount || 0)],
        ["Pagos por Año", paymentFrequency?.toString() ?? "N/D"],
      ]}
    />
  );
};

export default LoanFormDetails;
