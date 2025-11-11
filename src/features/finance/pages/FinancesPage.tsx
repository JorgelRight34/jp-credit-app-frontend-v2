import { transactionPermissionsProvider } from "@/features/Transactions/services/transactionsClient";
import { Tab, Tabs } from "@/components/Tabs";
import EntityLayout from "@/layouts/EntityLayout/EntityLayout";
import ProjectionSection from "../components/Projections/ProjectionSection";
import IncomesSection from "../components/Incomes/IncomesSection";
import ExpensesSection from "../components/Expenses/ExpensesSection";

const FinancesPage = () => {
  return (
    <EntityLayout
      permissionsProvider={transactionPermissionsProvider}
      title="Finanzas"
      showChooseProjectBtn={true}
    >
      <Tabs defaultActiveKey="projections">
        <Tab path="projections" title="Proyecciones">
          <ProjectionSection />
        </Tab>
        <Tab path="incomes" title="Ingresos">
          <IncomesSection />
        </Tab>
        <Tab path="expenses" title="Egresos">
          <ExpensesSection />
        </Tab>
      </Tabs>
    </EntityLayout>
  );
};

export default FinancesPage;
