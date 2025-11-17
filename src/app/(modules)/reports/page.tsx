import { Tab, Tabs } from "@/components";
import { ReportsSection } from "@/features/reports";
import { EntityLayout } from "@/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reportes",
};

const Page = () => {
  return (
    <EntityLayout title="Reportes" create={true}>
      <Tabs defaultActiveKey="all">
        <Tab eventKey="all" title="Todos">
          <ReportsSection />
        </Tab>
        <Tab eventKey="loans" title="Préstamos">
          <ReportsSection reportKey="loan" />
        </Tab>
        <Tab eventKey="collaterals" title="Garantías">
          <ReportsSection reportKey="collateral" />
        </Tab>
        <Tab eventKey="profiles" title="Pérfiles">
          <ReportsSection reportKey="profile" />
        </Tab>
        <Tab eventKey="transactions" title="Transacciones">
          <ReportsSection reportKey="transaction" />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
