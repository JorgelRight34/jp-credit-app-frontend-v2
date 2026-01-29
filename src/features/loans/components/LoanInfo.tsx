import { Loan } from "../models/loan";
import LoanInfoTable from "./LoanInfoTable";
import { loanClient } from "../services/loanClient";

interface LoanInfoProps {
  loan?: Loan;
  id?: number;
}

const LoanInfo = async ({ loan: givenLoan, id }: LoanInfoProps) => {
  const loan = givenLoan ?? (await loanClient.getLoan(id!));

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
