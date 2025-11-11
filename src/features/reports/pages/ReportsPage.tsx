import { Tab, Tabs } from "@/components/Tabs";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import ReportsSection from "../components/ReportsSection";

const ReportsPage = () => {
  return (
    <EntityLayout title="Reportes" create={true}>
      <Tabs defaultActiveKey="all">
        <Tab path="all" title="Todos">
          <ReportsSection />
        </Tab>
        <Tab path="loans" title="Préstamos">
          <ReportsSection reportKey="loan" />
        </Tab>
        <Tab path="collaterals" title="Garantías">
          <ReportsSection reportKey="collateral" />
        </Tab>
        <Tab path="profiles" title="Pérfiles">
          <ReportsSection reportKey="profile" />
        </Tab>
        <Tab path="transactions" title="Transacciones">
          <ReportsSection reportKey="transaction" />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default ReportsPage;
