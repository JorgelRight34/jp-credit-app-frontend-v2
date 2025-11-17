import { toCurrency } from "@/utils/utils";
import { Loan } from "../models/loan";
import { AppLink, DateLabel, Icon, Subtitle } from "@/components";

interface LoanPreviewCardProps {
  loan: Loan;
  className?: string;
}

const LoanPreviewCard = ({ loan, className = "" }: LoanPreviewCardProps) => {
  return (
    <div className={`rounded-lg border ${className}`}>
      <div className="border-bottom flex justify-between p-3">
        <div className="flex items-center">
          <h6 className="mb-0">Préstamo #{loan.id}</h6>
          <AppLink className="ms-2" to={`/loans/${loan.id}`}>
            <Icon icon="open_in_new" />
          </AppLink>
        </div>
        <Subtitle>
          <DateLabel date={loan.startDate} />
        </Subtitle>
      </div>
      <aside className="flex justify-between p-3">
        <div className="flex flex-col">
          <b>Mora</b>
          <span className="text-muted">{toCurrency(loan.paymentValue)}</span>
        </div>
        <div className="flex flex-col">
          <b>Intereses</b>
          <span className="text-muted">{toCurrency(loan.accruedInterest)}</span>
        </div>
        <div className="flex flex-col">
          <b>Principal</b>
          <span className="text-muted">
            {toCurrency(loan.principalBalance)}
          </span>
        </div>
      </aside>
    </div>
  );
};

export default LoanPreviewCard;
