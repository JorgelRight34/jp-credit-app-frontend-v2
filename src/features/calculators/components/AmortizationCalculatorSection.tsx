import AmortizationDataTable from "./AmortizationDataTable";
import AmortizationForm from "./AmortizationForm";
import { AmortizationCalculatorInput } from "../models/amortizationCalculatorInput";
import { AmortizationPayment } from "../models/amortizationPayment";
import { EntitySection, EntitySectionProps } from "@/components";

type AmortizationCalculatorProps = EntitySectionProps<
  AmortizationPayment,
  AmortizationCalculatorInput
>;

const AmortizationCalculatorSection = ({
  ...props
}: AmortizationCalculatorProps) => {
  return (
    <EntitySection
      Search={AmortizationForm}
      DataTable={AmortizationDataTable}
      {...props}
    />
  );
};

export default AmortizationCalculatorSection;
