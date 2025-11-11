import { EntityQuerySearch } from "@/components/EntityQuerySearch";
import { QuerySearchInput } from "../../../components/EntityQuerySearch/models/querySearchInput";
import { QuerySearchProps } from "../../../components/EntityQuerySearch/models/querySearchProps";
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
  return (
    <EntityQuerySearch<AmortizationLoanQuery>
      fields={fields}
      onSubmit={onSubmit}
      {...props}
    />
  );
};

export default AmortizationLoanForm;
