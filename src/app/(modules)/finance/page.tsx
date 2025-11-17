import { Tab, Tabs } from "@/components";
import {
  ExpensesSection,
  IncomesSection,
  ProjectionSection,
} from "@/features/finance";
import { transactionPermissionsProvider } from "@/features/transactions";
import { EntityLayout } from "@/layouts";

const Page = () => {
  return (
    <EntityLayout
      permissionsProvider={transactionPermissionsProvider}
      title="Finanzas"
      showChooseProjectBtn={true}
    >
      <Tabs defaultActiveKey="projections">
        <Tab eventKey="projections" title="Proyecciones">
          <ProjectionSection />
        </Tab>
        <Tab eventKey="incomes" title="Ingresos">
          <IncomesSection />
        </Tab>
        <Tab eventKey="expenses" title="Egresos">
          <ExpensesSection />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default Page;
