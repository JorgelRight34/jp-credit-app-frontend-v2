import {
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from "@/components";
import { AmortizationLoanQuery } from "../models/amortizationLoanQuery";

type AmortizationLoanFormProps = QuerySearchProps<AmortizationLoanQuery>;

const fields: QuerySearchInput<AmortizationLoanQuery>[] = [
  {
    type: "loan",
    label: "Préstamo",
    name: "loanId",
    id: "loanId",
    searchOnChange: true,
    col: 10,
  },
];

const AmortizationLoanForm = ({
  onSubmit,
  ...props
}: AmortizationLoanFormProps) => {
  return <EntityQuerySearch fields={fields} onSubmit={onSubmit} {...props} />;
};

export default AmortizationLoanForm;
