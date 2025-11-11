import { useMemo } from "react";
import useLoan from "../hooks/useLoan";
import { Loan } from "../models/loan";
import LoanInfoTable from "./LoanInfoTable";
import { LoadingSpinner } from "@/components/ui";

interface LoanInfoProps {
  loan?: Loan;
  id?: number;
}

const LoanInfo = ({ loan: givenLoan, id }: LoanInfoProps) => {
  const { loan: fetchedLoan, isLoading } = useLoan({ id });
  const loan = useMemo(
    () => givenLoan ?? fetchedLoan,
    [givenLoan, fetchedLoan]
  );

  if (isLoading) return <LoadingSpinner />;
  if (!loan) return <></>;

  return (
    <div className="flex flex-col">
      <div>
        <LoanInfoTable loan={loan} />
      </div>
      <div className="mt-3">
        <h4>Descripción</h4>
        <p>{loan.description ? loan.description : "Sin descripción"}</p>
      </div>
    </div>
  );
};

export default LoanInfo;
