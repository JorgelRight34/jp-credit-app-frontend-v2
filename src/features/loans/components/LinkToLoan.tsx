import AppLink, { AppLinkProps } from "../../../components/ui/AppLink";
import { Loan } from "../models/loan";
import clsx from "clsx";

interface LinkToLoanProps extends Omit<AppLinkProps, "to"> {
  loan?: Loan;
  id?: number;
}

const LinkToLoan = ({
  loan,
  children,
  id,
  className,
  onClick,
}: LinkToLoanProps) => {
  return (
    <AppLink
      className={clsx("text-accent !underline", className)}
      to={`/loans/${loan?.id || id}`}
      onClick={onClick}
    >
      {children ? children : `#${loan?.id || id}`}
    </AppLink>
  );
};

export default LinkToLoan;
