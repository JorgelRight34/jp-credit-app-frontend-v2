import { QuerySearchInput } from "../../../components/EntityQuerySearch/models/querySearchInput";
import { COMPOUND_OPTIONS } from "../../../utils/constants";
import { EntityQuerySearch } from "@/components/EntityQuerySearch";
import { downloadAmortizationBlobAs } from "../services/amortizationService";
import { AmortizationCalculatorInput } from "../models/amortizationCalculatorInput";
import { QuerySearchProps } from "@/models";

type AmortizationFormProps = QuerySearchProps<AmortizationCalculatorInput>;

const fields: QuerySearchInput<AmortizationCalculatorInput>[] = [
  {
    name: "principalBalance",
    id: "principalBalance",
    label: "Monto",
    placeholder: "Monto",
    type: "currency",
  },
  {
    name: "annualInterestRate",
    id: "annualInterestRate",
    label: "Tasa",
    type: "percentage",
    placeholder: "Tasa",
  },
  {
    name: "paymentFrequency",
    id: "paymentFrequency",
    label: "Frecuencia de Pago",
    type: "select",
    options: [
      [12, "Mensual"],
      [1, "Anual"],
    ],
  },
  {
    name: "numberOfPayments",
    id: "numberOfPayments",
    type: "number",
    label: "No. Pagos",
    min: 1,
  },
  {
    name: "compound",
    id: "compound",
    label: "Capitalización",
    type: "select",
    options: COMPOUND_OPTIONS,
  },
];

const AmortizationForm = ({ ...props }: AmortizationFormProps) => {
  return (
    <EntityQuerySearch<AmortizationCalculatorInput>
      fields={fields}
      onDownload={downloadAmortizationBlobAs}
      {...props}
    />
  );
};

export default AmortizationForm;
