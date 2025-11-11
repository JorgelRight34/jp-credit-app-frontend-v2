import { EntitySectionProps } from "@/components/EntitySection/models/EntitySectionProps";
import AmortizationDataTable from "./AmortizationDataTable";
import AmortizationForm from "./AmortizationForm";
import { AmortizationCalculatorInput } from "../models/amortizationCalculatorInput";
import EntitySection from "@/components/EntitySection/components/EntitySection";
import { AmortizationPayment } from "../models/amortizationPayment";

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
