import { Tab, Tabs } from "@/components/Tabs";
import AmortizationLoan from "../components/LoanAmortization";
import AmortizationCalculator from "../components/AmortizationCalculatorSection";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";

const AmortizationsPage = () => {
  return (
    <EntityLayout title="Armotizaciones">
      <Tabs defaultActiveKey="general">
        <Tab path="calculate" title="Armotización">
          <AmortizationCalculator />
        </Tab>
        <Tab path="loan" title="Armotización Préstamo">
          <AmortizationLoan />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default AmortizationsPage;
