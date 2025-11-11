import { Loan } from "../models/loan";
import LoansSection from "./LoansSection";
import { loansQueryKey } from "../lib/constants";
import { getLoan } from "../services/loanClient";
import { EntitySearchInputProps } from "@/models";
import { EntitySearchInput } from "@/components/EntityForm";
import { LoanQuery } from "../models/loanQuery";

type LoanSearchInputProps = EntitySearchInputProps<Loan, LoanQuery>;

const LoanSearchInput = ({
  label = "Préstamo",
  value,
  ...props
}: LoanSearchInputProps) => {
  return (
    <EntitySearchInput<Loan, LoanQuery>
      cacheKey={loansQueryKey}
      modalProps={{
        title: "Buscar Préstamo",
        height: "90dvh",
        width: "75dvw",
      }}
      label={label}
      accesorFn={(l) => l?.id}
      visibleValueFn={(l) => (l ? `Préstamo #${l?.id}` : "")}
      onSearch={getLoan}
      value={value}
      {...props}
      render={(setValue) => <LoansSection table={{ onRowClick: setValue }} />}
    />
  );
};

export default LoanSearchInput;
