import { Tab, Tabs } from "@/components";
import {
  AmortizationCalculatorSection,
  AmortizationLoanForm,
} from "@/features/calculators";
import { EntityLayout } from "@/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadoras",
};

const Page = () => {
  return (
    <EntityLayout title="Armotizaciones">
      <Tabs defaultActiveKey="general">
        <Tab eventKey="calculate" title="Armotización">
          <AmortizationCalculatorSection />
        </Tab>
        <Tab eventKey="loan" title="Armotización Préstamo">
          <AmortizationLoanForm onSubmit={async (q) => await q} />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
