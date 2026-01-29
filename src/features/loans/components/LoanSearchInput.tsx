import { Loan } from "../models/loan";
import { LoanQuery } from "../models/loanQuery";
import { loansQueryKey } from "../lib/constants";
import { loanClient } from "../services/loanClient";
import { EntitySearchInput, EntitySearchInputProps } from "@/components";
import LoansSection from "./LoansSection";

type LoanSearchInputProps = EntitySearchInputProps<Loan, LoanQuery>;

const LoanSearchInput = ({
  label = "Préstamo",
  value,
  ...props
}: LoanSearchInputProps) => {
  return (
    <EntitySearchInput
      cacheKey={loansQueryKey}
      modalProps={{
        title: "Buscar Préstamo",
        height: "90dvh",
        width: "75dvw",
      }}
      label={label}
      accesorFn={(l) => l?.id}
      visibleValueFn={(l) => (l ? `Préstamo #${l?.id}` : "")}
      onSearch={loanClient.getLoan}
      value={value}
      {...props}
      render={(setValue) => <LoansSection table={{ onRowClick: setValue }} />}
    />
  );
};

export default LoanSearchInput;
